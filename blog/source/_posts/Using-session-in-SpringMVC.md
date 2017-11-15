---
title: SpringMVC实现session分布式管理
date: 2017-07-06 03:48:23
categories: SpringMvc
tags: session
---

在程序开发中不可避免的要和session打交道，那么我们如何在Spring项目使用session呢？本文记录了在项目中使用session的流程和遇到的问题。
> 环境：SpringMVC，tomcat，redis，Spring session

<!--more-->

## 配置spring session
+ 安装jar包
```
<dependency>
	<groupId>org.springframework.session</groupId>
	<artifactId>spring-session</artifactId>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-redis</artifactId>
</dependency>
```
+ 安装redis，安装方式请自行google。下面附几条常用的命令。
  - 启动``redis-server.exe redis.windows.conf ``
  -  运行``redis-cli.exe -h 127.0.0.1 -p 6379``
  - 设置密码``config set requirepass test123``
  - 授权``auth test123``
  - 查询``keys  *	``
+ 配置spring
 - 创建spring配置
```
@Configuration
@EnableRedisHttpSession 
public class HttpSessionConfig {
	// 设置HttpSession策略。默认读取header中的X-Auth-Token,作为sessionId。
        @Bean
        public HttpSessionStrategy httpSessionStrategy() {
                return new HeaderHttpSessionStrategy(); 
        }
}
```
     @EnableRedisHttpSession注解创建了springSessionRepositoryFilter来实现过滤功能，将所有的session都放在了redis中。
-  在.properties或者.yml文件中配置redis
```
spring.session.store-type=redis
spring.redis.host=localhost
spring.redis.password=test123
spring.redis.port=6379
server.session-timeout=86400
```
## 如何获取session
我们可以通过一下方式通过键值对的形式储存设置session。
```
        HttpSession session = request.getSession();
        session.setAttribute(key, value);
```
运行后，我们可以看到redis中多了一条记录。但是我们如何把这条记录取出来呢，这个问题似乎难倒了很多人。在上面配置spring时，我们加入了以下代码
```
// 设置HttpSession策略。默认读取header中的X-Auth-Token,作为sessionId。
@Bean
public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderHttpSessionStrategy(); 
}
```
这段代码的作用是，当我们接收到http请求时，响应头信息会有``x-auth-token``，当我们你发送请求时，头信息中也会有``x-auth-token``。回到问题，接下来如何具体实现呢，时序图如下
![](/images/选区_083.png)
当我们第一次发送请求后，响应头信息中会有一项``x-auth-token``，再发送下一次请求时，把第一次请求的``x-auth-token``及对应的值放在头信息中，那么HttpSession就认为是同一个客户发送的请求，我们就可以通过``getAttribute``方法获取session信息了。
> 时序图中的长方形表示激活，代表时序图中对象执行一项操作的时期。

## 总结
通过时序图屡一下关系
![](/images/选区_084.png)
通过时序图可以知道，我们把session信息储存在过滤器中，这样session就不依赖于各个节点的服务器，直接从高性能的键值对数据库redis中获取session信息。



参考文献：1.[https://docs.spring.io/spring-session/docs/current/reference/html5/guides/rest.html](https://docs.spring.io/spring-session/docs/current/reference/html5/guides/rest.html) 