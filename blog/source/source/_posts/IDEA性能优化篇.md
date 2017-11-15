---
title: IDEA性能优化篇
date: 2017-05-27 14:33:41
tags:
---

从php转到java后，IDE改用idea了，但是使用idea运行起来比较慢，在网上搜集了一下资料优化idea，并记录如下。

<!--more-->

## 调整IDEA的启动JVM参数
打开idea，help->Edit Custom VM options,idea会自动复制bin目录下的idea64.exe.vmoptions文件（32位的idea.exe.vmoptions），我的运行内存是8g的，作如下调整
```
-Xms1g		//JVM初始分配的堆内存
-Xmx4g		//JVM最大允许分配的堆内存，按需分配
-XX:ReservedCodeCacheSize=1024m
-XX:PermSize=372M		//JVM初始分配的非堆内存
-XX:MaxPermSize=744M		//JVM最大允许分配的非堆内存，按需分配
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
```
改变jvm参数后，如果想了解内存的分布状况，勾选一下信息，可在右下角显示内存分配
![](/images/选区_022.png)
官方文档给出了推荐的修改方式，参考文献2讲述了jvm内存管理机制，及参数的详细说明，参考文献3从多个方面讲述了如何分配堆内存能够最有效的提高idea的效率。

参考文献：
1.[https://intellij-support.jetbrains.com/hc/en-us/articles/206544869-Configuring-JVM-options-and-platform-properties](https://intellij-support.jetbrains.com/hc/en-us/articles/206544869-Configuring-JVM-options-and-platform-properties) 
2.[http://www.cnblogs.com/mingforyou/archive/2012/03/03/2378143.html](http://www.cnblogs.com/mingforyou/archive/2012/03/03/2378143.html) 
3.[http://tomaszdziurko.com/2015/11/1-and-the-only-one-to-customize-intellij-idea-memory-settings/](http://tomaszdziurko.com/2015/11/1-and-the-only-one-to-customize-intellij-idea-memory-settings/) 

## 自动编译
+ 全部勾选红色方框中的部分
![](/images/选区_021.png)
+ ``ctrl + shift + alt + /``快捷键
![](/images/选区_094.png)

> 在Edit Configuration中，查看Before launch中是否有太多设置，耽误运行时间。


## jrebel热部署
（待破解）


参考文献：
http://www.jianshu.com/p/d177316890e3