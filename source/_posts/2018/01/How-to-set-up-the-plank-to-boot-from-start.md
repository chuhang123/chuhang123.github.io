---
title: 如何设置plank开机自启动
date: 2018-01-06 22:07:53
tags: ubuntu
---

本问记录plank如何安装,并如何设置plank开机自启动.
+ 安装plank
```
sudo add-apt-repository ppa:ricotz/docky
sudo apt-get update
sudo apt-get install plank
```
+ 设置plank开机自启动.``sudo gedit ~/.config/autostart/plank.desktop``,并增加如下内容
```
[Desktop Entry]
Type=Application
Exec=plank
Hidden=false
NoDisplay=false
Name[en_US]=plank
Name=plank
Comment[en_US]=plank
Comment=plank
X-GNOME-Autostart-Delay=2
X-GNOME-Autostart-enabled=true
```

> 安装plank后,如果不能正常启动,重启电脑即可.

参考:[Install Plank on Ubuntu, make it start on boot](https://www.jernejsila.com/2017/02/03/install-plank-ubuntu-make-start-boot/) 