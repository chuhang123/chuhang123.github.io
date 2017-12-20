---
title: windows10/ubuntu双系统安装记录
date: 2017-09-18 14:00:01
tags: [win10, ubuntu]
categories: basis
---

因为要换硬盘，所以要重新安装win10和ubuntu系统。把中间遇到的一些问题记录了下来。

## 安装win10系统
首先，下载了一个win10的iso文件，通过UltraISO刻录到U盘中。把新的硬盘装进电脑，启动，按下F12，把U盘作为第一启动项，然后界面一直循环出现如下代码
```
No Systemdisk. Booting from harddisk.
Start booting from USB device...
Disk formatted with UltraISO 9.0(c) 2002-2008 EZB System,Inc
```
然后google了这个问题，有说是写入方式不对，或者没有把U盘作为第一启动项等，或者是iso文件的问题。我感觉可能行较大的是写入方式不对，刻录了多次，换了多种的写入方式，然而还是不行。最后，去网吧使用韩博士安装系统的方式，重新下载了一个iso文件，win10系统就重装成功了。

## 安装ubuntu系统
安装ubuntu同样使用UltraISO刻录到U盘的方法，重启电脑一切正常，然后开始搭建java、maven、node、git等环境，配置完之后，以为大功告成。然而发现不能重启ubuntu系统了，此时心情是崩溃的，最终发现可以从高级选项中进入ubuntu系统，进入系统后，google了一番，决定使用boot repair修理一下，修理完之后，发现ubuntu、win10系统都进不去了，直接显示grub命令行。这是很揪心的，毕竟平时的一些资料都在里面。查找了一些解决办法，并没有解决。只能再次重装系统。

## 再次重装系统
但是应该重装那个呢。因为是后装的ubuntu系统，所以启动的时候win10是通过ubuntu启动的，问了下老师，如果重装win10系统，win10系统有一个启动修复的方法，挽救会win10系统，ubuntu系统就废掉了。
> 当时比较纠结如果直接重装ubuntu系统，还能不能通过新装的ubuntu系统进入到之前安装的win10系统，经过实践之后发现是可以的。

当时有ubuntu的iso文件，就先装了ubuntu系统试试，按照上一次安装ubuntu的方法，装完后，很是担心重复出现上一次的情况。老师问了下我的安装方式，说我安装类型哪一步有错误。我选择的是默认安装，所以ubuntu系统可能出问题，应该手动进行分区。于是就参考[Windows10+Ubuntu双系统安装[多图]](http://www.jianshu.com/p/2eebd6ad284d) （手动的进行分区）又重新安装了一下ubuntu系统，之后一切顺利。

参考链接：
1.[Windows10+Ubuntu双系统安装[多图]](http://www.jianshu.com/p/2eebd6ad284d) 
