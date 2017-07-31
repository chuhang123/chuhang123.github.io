---
title: 在SpringMVC中启用https协议
date: 2017-06-26 16:02:03
categories: SpringMvc
tags: [https]
---

由于项目需求，笔者使用SpringMVC开发的后台必须使用https协议。经过一番折腾后，终于完成了这一需求。但是由于刚接触spirng，水平有限，从中走了许多弯路，本文记录了问题的解决方案，并对从中踩过坑进行反思。

<!--more-->
## 获取SSL证书
获取SSL证书的方式有两种
+ 通过keytool生成在（需要java环境），打开终端输入下面的命令
```
keytool -genkey -alias tomcat  -storetype PKCS12 -keyalg RSA -keysize 2048  -keystore keystore.p12 -validity 3650

Enter keystore password:
Re-enter new password:
What is your first and last name?
[Unknown]:
What is the name of your organizational unit?
[Unknown]:
What is the name of your organization?
[Unknown]:
What is the name of your City or Locality?
[Unknown]:
What is the name of your State or Province?
[Unknown]:
What is the two-letter country code for this unit?
[Unknown]:
Is CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown correct?
[no]: yes
```
完成后，将会在系统目录下生成 keystore.p12文件，你也可以在指定目录下生成该文件，如果在``/home/administrator/下载/installpackage/key``路径下生成keystore.p12文件，可使用下面的指令
```
keytool -genkey -alias tomcat -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore /home/administrator/下载/installpackage/key/keystore.p12 -validity 3650
```
此方法比较方便快捷，但是浏览器会提示不安全（如下图），比较适用于开发阶段。
![](/images/选区_079.png)
+ 另外一种是通过正规渠道购买。

## 在SpringMVC中启用https协议
首先，在配置文件中引入Spring Boot依赖。Spring Boot内嵌的tomcat服务器会在http服务的8080端口启动。在application.properties文件中通过一下配置可启用https协议：
```
server.port=8443
server.ssl.key-store=classpath:keystore.p12 		//把之前生成的证书放在src/main/resources目录下
server.ssl.key-store-password=changeit
server.ssl.key-password=changeit
```
按照以上配置，启动应用程序，即可访问[https://localhost:8443](https://localhost:8443) 。

## 将http请求重定向至http
如果你也想使你的应用程序支持http服务，可以在配置文件中增加一下代码
```
  @Bean
  public EmbeddedServletContainerFactory servletContainer() {
      TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory() {
      @Override
      protected void postProcessContext(Context context) {
        SecurityConstraint securityConstraint = new SecurityConstraint();
        securityConstraint.setUserConstraint("CONFIDENTIAL");
        SecurityCollection collection = new SecurityCollection();
        collection.addPattern("/*");
        securityConstraint.addCollection(collection);
        context.addConstraint(securityConstraint);
      }
    };

    tomcat.addAdditionalTomcatConnectors(initiateHttpConnector());
    return tomcat;
  }
  private Connector initiateHttpConnector() {
    Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
    connector.setScheme("http");
    connector.setPort(8080);
    connector.setSecure(false);
    connector.setRedirectPort(8443);

    return connector;
  }
```
配置完成后，如果您访问[http://localhost8080](http://localhost8080) ,浏览器将会跳转至[https://localhost:8443/](https://localhost:8443/) 。

## 所犯的错误
+ 最开始google这个问题时，看到starkoverflow中有人说使用https服务的前提条件就是配置tomcat支持https。但是之前认为每次应用程序能在tomcat服务器上启动，是因为idea自带的tomcat。后来看了一篇[官方文档](https://spring.io/blog/2014/03/07/deploying-spring-boot-applications) ，才知道是spring boot集成了tomcat。
+ 有时候过于追求完美，在linux、windows系统下分别配置tomcat多个版本，然后在idea中集成tomcat时windows系统一直出问题，也耽误了一些时间。也因此有了[这篇博客](https://chuhang123.github.io/2017/06/23/%E5%9C%A8IDEA%E4%B8%AD%E9%83%A8%E7%BD%B2tomcat/) 

## 总结
解决这个问题花费了较长时间，主要原因是平时看文档看的太少，对很多东西都不了解。解决问题的过程中很多情况是不知道把代码放在那，不清楚是否适用于本项目。解决的问题中下载了多个实例，对sping的架构有了进一步的认识。

 > 参考文献：
 1. [Enable HTTPS in Spring Boot](https://drissamri.be/blog/java/enable-https-in-spring-boot/) 
 2.  https://spring.io/blog/2014/03/07/deploying-spring-boot-applications
 3. https://spring.io/guides/gs/securing-web/