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
+ 编辑server.xml文件``sudo gedit /usr/program/tomcat8/conf/server.xml
``
+ 安装见[极客学院](http://wiki.jikexueyuan.com/project/linux-in-eye-of-java/Tomcat-Install-And-Settings.html) 



## 安装node
ubuntu直接安装node，默认安装4.x版本的，所以要安装新版本的node，安装犯法如下：
+ 6.x版本的node

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

+ 8.x版本的node
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 安装软件
如果软件为.deb的软件包，那么就直接安装：``sudo dpkg -i xxx.deb``,如果出现需要安装xxx依赖，那么就运行``sudo apt-get install -f ``，就安装相关的依赖了。

## 经常断网
使用ubuntu的时候，发现每隔一段时间就会断一次网，感觉很不爽，解决办法如下：
+ 执行``sudo lshw -class network``命令。
```
chuhang@chuhang:~$ sudo lshw -class network
[sudo] chuhang 的密码： 
  *-network               
       description: Ethernet interface
       product: RTL8101/2/6E PCI Express Fast/Gigabit Ethernet controller
       vendor: Realtek Semiconductor Co., Ltd.
       physical id: 0
       bus info: pci@0000:01:00.0
       logical name: enp1s0
       version: 07
       serial: 34:17:eb:6c:8a:d1
       size: 10Mbit/s
       capacity: 100Mbit/s
       width: 64 bits
       clock: 33MHz
       capabilities: pm msi pciexpress msix vpd bus_master cap_list ethernet physical tp mii 10bt 10bt-fd 100bt 100bt-fd autonegotiation
       configuration: autonegotiation=on broadcast=yes driver=r8169 driverversion=2.3LK-NAPI duplex=half firmware=rtl8106e-1_0.0.1 06/29/12 latency=0 link=no multicast=yes port=MII speed=10Mbit/s
       resources: irq:44 ioport:4000(size=256) memory:b0b00000-b0b00fff memory:b0800000-b0803fff
  *-network
       description: Wireless interface
       product: Wireless 3160
       vendor: Intel Corporation
       physical id: 0
       bus info: pci@0000:02:00.0
       logical name: wlp2s0
       version: 83
       serial: a0:88:69:a8:1f:fb
       width: 64 bits
       clock: 33MHz
       capabilities: pm msi pciexpress bus_master cap_list ethernet physical wireless
       configuration: broadcast=yes driver=iwlwifi driverversion=4.10.0-28-generic firmware=17.459231.0 ip=10.20.103.9 latency=0 link=yes multicast=yes wireless=IEEE 802.11
       resources: irq:50 memory:b0a00000-b0a01fff
```
+ 新建并编辑config文件，``sudo vi /etc/pm/config.d/config``，在文件中输入``SUSPEND_MODULES="iwlwifi wlp2s0"``,iwlwifi对应的时driver，enp1s0对应的是 logical name。
+ 重新连接网络``sudo service network-manager restart``
> 适用于ubuntu16.04.参考：[Ubuntu 16.04 WiFi issues - How to perhaps fix it for you as well... ](https://grenangen.se/node/86) 