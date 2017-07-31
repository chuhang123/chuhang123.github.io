---
title: 在IDEA中部署tomcat
date: 2017-06-23 11:21:35
categories: SpringMvc
---

最近要开发一个小程序的项目，必须要使用https协议，idea自带的tomcat不知道怎么配置成https协议的，就想着在idea中部署自己电脑中的tomcat。下面是在idea中部署tomcat的过程。环境：2017版的idea，tomcat8，jdk1.8。

<!--more-->
1.file->setting->Application Servers，添加本机的tomcat,起一个名字，选则tomcat所在的路径。
 ![](/images/选区_072.png)
 2.Run->Edit Configurations,点击左上角的加号
  ![](/images/选区_073.png)
  起一个名字，然后点击右下角的apply。
  3.打开Project Structure（ctrl+Alt+shift+s）
  ![](/images/选区_074.png)
  选择artifacts，然后选择红色方框中的web appliscation: Exploded.
    ![](/images/选区_075.png)
    然后点击加号，选择directory contentl，选择项目中的一个目录即可，因为我的项目中暂时没有视图层，因此暂时选择c层的目录。然后保存运行即可。

4.这时点击运行，发现会在浏览器中访问localhost,但是服务器没有响应，会出现这样的界面
![](/images/选区_080.png)
 依次点击run->Debug Configurations 
![](/images/选区_076.png)
 勾选方框中的内容，tomcat就能正常的运行了。
       