---
title: angular+thinkphp上传图片
tags:  demo
date: 2017-05-13 09:51:34
categories:  [angularjs]
---

最近做的项目中需要用到图片上传功能，决定使用angular+thinkphp实现图片上传功能。尝试了ng-flow、ng-file-upload，都没有达到理想的效果，最终使用angular-file-upload实现。

<!--more-->

效果如下：

<video src='http://oligray7m.bkt.clouddn.com/1490257478069.mp4 ' type='video/mp4' controls='controls'  width='100%' height='100%'>
</video>

##  实现流程
+ 获取图片信息
+ 将图片移至指定的目录下
+ 将图片的信息保存到数据库中

## 具体细节
下载插件示例代码，插件的示例代码非常完善，图片的缩略图功能、进度展示、图片尺寸等信息示例代码中都有，并且每一个操作的返回值也都给出了，使用非常方便。
将相关资源引入，上传的样式即可实现。修改路由信息，当用户点击上传按钮时，调用请求的方法，讲图片保存，并返回图片id，点击提交按钮，将图片id存入对应的模块中。




对应的时序图如下(新增和编辑)：
![时序图](http://oligray7m.bkt.clouddn.com/RJH2OW2@MXSUE1FGO64YV7S.png) 

如有错误，欢迎指正！