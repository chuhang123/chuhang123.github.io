---
title: Spring-Idea-Ubuntu环境搭建
date: 2017-06-16 09:51:34
tags: [ubuntu, enviroment]
categories: [java]
---
近几天学习springMVC，但是发现一直比较卡，就尝试在ubuntu系统下搭建springMVC环境，看看效果。首先搭建java环境，安装jdk，下载idea，安装xampp，打开xampp的mysql控制台，创建数据库，进本的环境就起来了。

<!-- more-->
## 增加内存、swaf空间
碰到的第一个问题是开始安装ubuntu时分配的内存有点小了，想增加磁盘空间，并提高ubuntu系统的性能。
+ 增加ubuntu磁盘空间，请参考[这里](https://help.ubuntu.com/community/ResizeandDuplicateWubiDisk) ，
+ 增加swaf空间,不了解swaf的，请戳[这里](http://baike.baidu.com/item/Swap/2666174) ，执行下面的9条语句，增加2G的swaf空间。
```
sudo su
swapoff -a
cd /host/ubuntu/disks/
mv swap.disk swap.disk.bak
dd if=/dev/zero of=swap.disk bs=1024 count=2097152
mkswap swap.disk
swapon -a
free -m
rm swap.disk.bak
```
> 笔者使用的wubi装的windows、ubuntu双系统，故如果相对ubuntu系统进行改动的话，请参考[官方文档](https://wiki.ubuntu.com/WubiGuide#How_do_I_resize_the_virtual_disks.3F) ，一定是最节约时间的方法。

## 数据库
启动xampp``sudo /opt/lampp/lampp start``
启动mysql``sudo /opt/lampp/lampp startmysql``
打开sql控制台``/opt/lampp/bin/mysql -u root``
显示数据库``show databases;``
删除数据库``drop database  name;``

## 配置环境变量
+ 用户目录下的 .bashrc 文件``gedit ~/.bashrc ``该文件编辑保存后，可立即在新打开的终端窗口内生效。该方式添加的变量只能当前用户使用。
+ 系统目录下的 profile 文件``sudo gedit /etc/profile``
+ 系统目录下的 environment 文件``sudo gedit /etc/environment``

## 查看内存相关信息
+ 查看磁盘空间``df -h``
+ 查看cup使用率``top``
+ 查看内存``free``
+ 杀死进程``killall -9 name``，name表示进程的名字，如``killall -9 shutter``

## 配置tomcat
+ 启动 
```
sh /usr/program/tomcat8/bin/startup.sh ; tail -200f /usr/program/tomcat8/logs/catalina.out
```
+  停止 ``sh /usr/program/tomcat8/bin/shutdown.sh``
+ 编辑server.xml文件```sudo gedit /usr/program/tomcat8/conf/server.xml
```
+ 安装见[极客学院](http://wiki.jikexueyuan.com/project/linux-in-eye-of-java/Tomcat-Install-And-Settings.html) 



