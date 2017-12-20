---
title: 'GLib-GIO-ERROR **: Settings schema xxx  is not installed'
date: 2017-08-27 11:08:24
tags: [install]
---

今天安装peek的时候，报了这么一行错误
```
(peek:11612): GLib-GIO-ERROR **: Settings schema 'com.uploadedlobster.peek' is not installed

Trace/breakpoint trap (core dumped)
```
<!--more-->

首先对问题简单分析一下，大致是com.uploadedlobster.peek这个包没有没安装，或者安装了找不到，可是这个包应该怎么安装呢。
+ 第一步，还是老方法，把这行代码放到谷歌上，但并没有找到问题的解决方案。
+ 接下来，就是找类似问题的解决方案，``Settings schema is not installed``，但是由于英文阅读能力不行，没有发现问题的解决方案。
+ 然后卸载，尝试``sudo apt install -f peek``，安装相关的依赖，并没有什么用。
+ 一番无奈之后，以``Settings schema is not installed 解决方案 ``为关键字，解决了该问题。

## 解决方法
```
glib-compile-schemas /usr/share/glib-2.0/schemas
```
执行完上述命令，peek就可以用了。可能和``/usr/share/glib-2.0/schemas``文件下的``com.uploadedlobster.peek.gschema.xml``文件有关系。

参考文献：[ ubuntu的Files资源管理器打不开解决方案](http://blog.csdn.net/wshish920907/article/details/72730370) 