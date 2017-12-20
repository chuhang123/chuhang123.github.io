---
title: SpringMVC+Angularjs上传图片
date: 2017-10-10 15:24:23
tags: [angular, js, upload, image, angularFileUpload]
categories: [SpringMvc]
---

最近，完成了图片上传的功能，中间也遇到了一些问题，本文记录了上传图片的代码段，希望下次开发相同的功能时尽可能的节约时间。环境：后台SpringMvc，前台angularjs，前台插件[angular-file-upload ](https://www.npmjs.com/package/angular-file-upload) 。

<!--more-->
## 开发思路
+ 开发顺序：先开发前台，再开发后台。从而避免开发后台的功能后，前台不需要此功能的情况。
+ 前台开发：我们把图片作为一个指令，以方便在各个模块中的使用。引入angular-file-upload插件。
+ 后台应该建立图片相关实体，后台获取到图片后，对文件流进行sha1或md5加密，判断如果后台服务器已经存在相同的图片，则不在上传该图片，直接引用之前上传的图片，以节约服务器资源。类似地，删除图片时，也应该判断是否改图片被引用多次，如果被引用多次，则不需要删除服务器中的图片，只删除图片实体中的那一条记录即可。如果用户要删除的图片只被引用一次，则删除图片实体中的记录，并删除服务器中的图片，释放服务器资源。同时，参考[官方文档](https://spring.io/guides/gs/uploading-files/) ，并根据前台需求，完成后台功能代码。
> 通过这种方法，如果用户上传较大的文件，且服务器之前已经上传过相同的文件，那么就可以实现秒传，同时节约了服务器的资源。所以，有时我们在一些平台上（如迅雷）上传几百兆或者几个Ｇ的文件，也可秒传，并不是网速很快，而是因为服务器上已经存在相同的文件。
+ 给出附件实体实例
```
@Entity
@ApiModel(value = "Attachment (附件)", description = "附件")
public class Attachment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @ApiModelProperty("操作用户")
    private User operator;

    @ApiModelProperty("sha1值")
    private String sha1;

    @ApiModelProperty("md5值")
    private String md5;

    @ApiModelProperty("附件扩展名")
    private String ext;

    @ApiModelProperty("附件大小")
    private String size;

    @ApiModelProperty("附件上传时间")
    private Long createTime;

    @ApiModelProperty("附件更新时间")
    private Long updateTime;

    @ApiModelProperty("附件名称")
    private String name;

    @ApiModelProperty("附件存储路径")
    private String savePath;

    @ApiModelProperty("附件存储名称")
    private String saveName;

    @ApiModelProperty("MIME类型")
    private String MIME;
    // 省略constructor、getters、setters
   
```

## 前台代码
界面的效果图如下：
<img src="/images/94.png" >
> 前台代码放在github上，代码地址：[https://github.com/chuhang123/blog/tree/master/2017/uploadImage](https://github.com/chuhang123/blog/tree/master/2017/uploadImage) 。

在前台代码中，我们需要对图片标题[长度过滤](https://github.com/chuhang123/blog/blob/master/2017/uploadImage/imagetitle.js) ，代码如下：
```
// 长度为２０
return function (input) {
    var r=/[^\x00-\xff]/g;
    if(input.replace(r,"mm").length<=20){return input;}
    var m=Math.floor(20/2);
    for(var i=m;i<input.length;i++){
        if(input.substr(0,i).replace(r,"mm").length>=20){
            return input.substr(0,i)+"...";
        }
    }
    return input;

};
```
显示图片的[缩略图](https://github.com/chuhang123/blog/blob/master/2017/uploadImage/yunzhithumb.js) ，并根据项目需求请求后台代码。

## 后台代码
在后台的附件控制器中建立三个请求借口：删除、上传、图片访问入口。同时参考[官方文档](https://spring.io/guides/gs/uploading-files/) 。

<img src="/images/95.png" >
+  如上图所示，需要注意４个地方：
1. 预览图片时，我们要根据图片的保存名称来浏览图片，我们要使用``{saveName:.+}``获取图片的名称，否则不能正确获取图片的名称。
2. 参考官方教程浏览图片时，控制台会抛出``HttpMessageNotWritableException``异常，我们需要设置响应信息的内容类型，就把这个异常给解决了。
3. 官方文档是把文件流放在响应信息中，但这种方式相当消耗服务器的资源，假设一个图片１Ｍ，有１００个并发请求，那么就要消耗服务器１００Ｍ的内存，那么如果有更多的并发请求，那么就非常消耗资源。所以等项目上线后把开放图片路径，以节约服务器资源。
4. 上传的图片类型为``MultipartFile``, 所以前台的请求内容类型应该为``Content-Type:multipart/form-data``，请求实例如下：
```
var formData = new FormData();
formData.append('attachment', image);

$http.post(url, formData, {
transformRequest: angular.identity,
headers: {'Content-Type': undefined}
})........
```

+ 设置图片大小上限，在配置文件中增加如下代码：
 
```
// 设置图片最大为３Ｍ
spring.http.multipart.max-file-size=3072KB　
spring.http.multipart.max-request-size=3072KB
```

+ 当其他实体和附件相关时，比如强检申请：附件=1：n，因为可能还会有很多实体和附件相关联，因此在强检申请实体中使用@OneToMany单向映射较为合适。为了操作方便，通过使用 @JoinColumn不再建立中间表。
```
@OneToMany
 @JoinColumn(name = "mandatoryInstrumentApply_id")  
```

+ 因为我们需要对MultipartFile类型的文件进行sha1、md5加密，所以这里给出hash加密算法：
``` 
/**
     * 根据指定的算法加密文件数据, 返回固定长度的十六进制小写哈希值
     *
     * @param multipartFile 需要加密的文件
     * @param algorithm 加密算法, 例如: MD5, SHA-1, SHA-256, SHA-512 等
     */
    static String encrypt(MultipartFile multipartFile, String algorithm) throws Exception {
        InputStream in = null;

        try {
            // 1. 根据算法名称获实现了算法的加密实例
            MessageDigest digest = MessageDigest.getInstance(algorithm);

            in = multipartFile.getInputStream();
            byte[] buf = new byte[1024];
            int len = -1;
            while ((len = in.read(buf)) != -1) {
                // 2. 文件数据通常比较大, 使用 update() 方法逐步添加
                digest.update(buf, 0, len);
            }

            // 3. 计算数据的哈希值, 添加完数据后 digest() 方法只能被调用一次
            byte[] cipher = digest.digest();

            // 4. 将结果转换为十六进制小写
            return bytesToString(cipher);

        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (Exception e) {
                    // nothing
                }
            }
        }
    }

    // 将字节转为字符串
    static String bytesToString(byte[] bytes) {
        if (bytes == null || bytes.length == 0) {
            return null;
        }

        StringBuilder stringBuilder = new StringBuilder();

        for (byte b : bytes) {
            stringBuilder.append(HEXES[(b >> 4) & 0x0F]);
            stringBuilder.append(HEXES[b & 0x0F]);
        }

        return stringBuilder.toString();
    }

    // 十六进制字符数组
    static char[] HEXES = {
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'a', 'b',
            'c', 'd', 'e', 'f'
    };
```

## 总结
这次附件上传花费了较长的时间，一方面水平不够，一方面有些追求完美，从而耽误了时间，所以完成任务是第一位的，切忌追求完美。望以后注意。