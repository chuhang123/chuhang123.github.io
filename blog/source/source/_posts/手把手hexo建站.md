---
title: hexo+Github Pages搭建个人博客详解
date:  2017-05-19 08:01:54
tags: [hexo]
comments: true
---

github Pages是托管在github上的静态网页，有300M的免费空间。Hexo 是一个快速、简洁且高效的博客框架。因为hexo是静态页面，不涉及到和数据库的交互等复杂操作，所以github pages的300M空间足以使用。本文将手把手教你在github pages上使用hexo搭建静态博客。您需要一个github账号，[Node.js](https://nodejs.org/en/) 、[git](https://git-scm.com/) 应用程序

<!--more-->

## hexo建站
+ 安裝hexo ``npm install -g hexo-cli``
+ 初始化博客``hexo init <folder>``
+ 切換到对应的目录``cd <folder>``
+ 检查是否有未安装的依赖``npm install``
+ 配置_config.yml文件，参考[官网](https://hexo.io/zh-cn/docs/configuration.html) ，配置文件信息务必要填写正确。eg：``timezone: Asia/Shanghai``，如出现拼写错误将影响文章发表的日期。
+ 在本地预览博客``hexo s``
+ 发布文章``hexo new "My New Post"``，终端会显示文章生成的路径，按照对应的路径即可编辑文章。

## 将博客部署到github pages上
+ 进入github官网，创建一个github仓库，命名为``username.github.io``。eg：chuhang123.github.io
+  修改_config.yml文件的部署地址，实例如下：
```
deploy:
  type: git 
  repo: https://github.com/chuhang123/chuhang123.github.io.git
  branch : master
```
+ 将本地的博客推送到服务器上`` hexo d -g``
+ hexo有很多主题，读者可根据自己的喜好安装自己喜欢的主题，主题一般都会有对应的教程，如笔者使用的[jacman主题](https://github.com/wuchong/jacman) ，[教程](http://jacman.wuchong.me/2014/11/20/how-to-use-jacman/) 就很详尽，请读者根据自己所选择的主题自行配置。
> 如出现博客推送到服务器后，css样式无法显示，执行``hexo clean``，再次推送即可。

## hexo上传图片、视频
+ 将图片储存在本地，通过``![](/images/image.jpg)``访问图片，文件夹images和_posts为同一目录。将图片放在images文件夹即可。
+ 将图片储存在七牛云。如果你的博客有大量的图片，可以将图片放在七牛云上，然后复制url，插入即可。
+ 上传视频，建议将视频放在七牛云上，[实例效果](https://chuhang123.github.io/2017/05/13/angular-thinkphp%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/) ，实例代码
``` 
<video src='http://oligray7m.bkt.clouddn.com/1490257478069.mp4 ' type='video/mp4' controls='controls'  width='100%' height='100%'>
</video>
```
+ 使用[asciinema](https://asciinema.org) 在终端录制视频，安装及操作过程请参考[这里](https://asciinema.org/docs/installation) ，执行``asciinema rec``命令，开始录制终端，``Ctrl-D``结束录制，录制结束后会生成录制视频的网址。您也可以注册一个asclinema账号，对录制的视频进行管理。

## 畅言评论系统
因为多说评论系统即将关闭,[disqus](https://disqus.com/) 在国内访问受限，所以本博客转为使用[畅言](https://changyan.kuaizhan.com/) 。但是很多主题默认的评论系统只有duoshuo或者disqus。所以需要自行安装。登录官网，发现使用畅言必须要有备案才能使用，不过也不用担心，在网上随便找一个域名，在[ICP备案查询](http://icp.chinaz.com/) 中查找备案号，填入即可，审核通过后（大约要几个小时），进入畅言后台-系统设置-通用设置，进行修改即可，eg：![](/images/选区_002.png)。

将代码放在comment.ejs文件中
<img src="/images/选区_001.png" width="85%" height="85%" >
将博客部署到服务器上，你可能发现电脑端没有畅言评论框，打开控制台，你可能会看到下面的报错提示
```
chuhang123.github.io/:211 Mixed Content: The page at 'https://chuhang123.github.io/2017/05/19/%E6%89%8B%E6%8A%8A%E6%89%8Bhexo%E5%BB%BA%E7%AB%99/' was loaded over HTTPS, but requested an insecure script 'http://assets.changyan.sohu.com/upload/changyan.js?conf=c245a97f00b9a8889eb374d9a544c127&appid=cyt1izVGM'. This request has been blocked; the content must be served over HTTPS.
```
大致是说只能使用https请求，不能使用http请求，有以下两种解决方案
+ 因为畅言支持https加密站点，直接将js代码中的http请求修改为https即可。
+ 在head标签中加入一下代码，会将博客中http请求自动转化为https请求，但是在本地预览可能有问题,暂时还没找到解决方案
``` 
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<meta name="author" content="chuhang">
```
使用任意一种解决方案后，就可以愉快的使用畅言评论系统了。
> 将博客部署到github后，注意博客的访问速度，如果访问过慢，打开控制台，看看是有什么原因导致的，比如使用百度站内搜索，将http修改为https后，访问速度就会变慢。

## markdown基本语法
[Markdown ](https://zh.wikipedia.org/wiki/Markdown) 是一种轻量级标记语言，非常适合写作。现将基本的markdown语法整理如下，方便未使用过markdown的读者参考
<img src="/images/选区_003.png" width="85%" height="85%" >
>如果您发现有的效果没有实现，不防加个空格试试。eg：### 梦云智（最后一个”#”和”梦”之间加空格）。

## 最后
通过以上步骤，一个基本的博客站点就可以搭建起来了。建议每篇博客都要有关键词，提升被搜索引擎的找到的概率。 如果对主题的样式不是特别满意，您可以在themes/themeName/layout文件夹下修改主题页面的整体布局，在themes/themeName/source/css文件夹下修改css属性，打造属于自己的style。
> 如有错误，欢迎指正。谢谢！
 
 




