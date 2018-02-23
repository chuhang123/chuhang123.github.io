---
title: java找不到连接数据库的jdbc驱动
date: 2018-01-12 09:22:01
tags: [jdbc, sql]
categories: java
---

java链接数据库时需要mysql的驱动,但是我们下载驱动之后,应该如何配置呢,才能正确的找到驱动的位置.(ubuntu系统)

报错如下:
```
java.lang.ClassNotFoundException: com.mysql.jdbc.Driver
        at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:335)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:264)
        at MySQLDemo.main(MySQLDemo.java:18)
```

解决方法如下:
+ ``sudo gedit /etc/profile``
+ 将驱动的位置设置到环境变量中:
```
## mysql driver
export CLASSPATH=.:$JAVA_HOME/lib/mysql-connector-java-5.1.39-bin.jar
```
+ 使刚才配置的环境变量生效:``source /etc/profile``
配置环境变量之后,就可以正确的找到驱动了.