---
title: http请求的封装与过滤
date: 2017-06-23 22:15:49
categories:  [SpringMvc]
tags: [小程序]
---

最近做的净水器项目，前台需要对发送的请求进行统一的封装，后台需要对请求进行统一的验证。本文记录了前台进行的http请求的封装及后台进行的http请求的过滤。前台：小程序，后台：SpringMvc.

<!--more-->

## 小程序对http请求进行封装
在微信小程序[wx.request官网](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html) 中的http请求是这样的：
```
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
    console.log(res.data)
  }
})
```
由于请求的地址及参数是改变的，所以封装后的请求至少需要地址、请求参数。封装后代码是这样的
```
    //发送http请求
    var http = require("../../utils/httpUtil.js");	//引入封装http的文件
    var params = {
        id: app.number
    };
    var api = "WaterPurifier/";
    
    http.GET(api, params, function(res){
        console.log(res.data);
    });
```
由以上代码可知，封装的http请求是在util文件夹中建立httpUtil.js文件，可以根据自己的实际需求，对参数作统一的处理，比如统一加密之类的，也可以直接对get、post方法的header信息作统一处理。总之，对http请求封装之后，不仅实现了我们的业务需求，而且也使代码更简洁了。

> 参考文献：[微信小程序中对网络请求的封装](https://ywxv.github.io/wxapp-http-request.html) 

## SpringMvc使用zuul过滤
在SpringMvc中，使用zuul可以对请求进行过滤，使用请参考[官方文档](http://spring.io/guides/gs/routing-and-filtering/) 
![](/images/7.png)
由上图可知，前台请求的地址实际上是zuul过滤器的地址，然后再由zuul过滤器进行转发到后台的逻辑层。在项目上线后，我们可以吧zuul过滤器放在一个服务器中，把后台的逻辑层代码放在另外一个服务器中，从而减轻了服务器的负担。
```JAVA
//获取请求
RequestContext ctx = RequestContext.getCurrentContext();
HttpServletRequest request = ctx.getRequest();
 ```
 + 我们可以根据ctx对象来设置请求的状态码、请求的头信息、拦截请求等一系列操作。查找的途径是直接看RequestContext包中的方法。
 + 我们可以根据request对象来获取请求的参数。我们可以直接浏览HttpServletRequest接口中的方法。
 
## 总结
最开始对前台的请求进行加密，后台的请求进行解密时，感觉也不麻烦。但是老师让我对请求进行封装，内心是抗拒的，当时可能感觉封装请求是个麻烦的过程。但是对前台的请求进行封装后 ，发现确实方便了很多。所以在以后的项目中，如果需要对某一类东西做统一的处理，就要封装，不仅规范，而且方便。