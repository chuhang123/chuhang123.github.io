---
title: 初始cookie与session
date: 2017-05-16 09:51:34
tags:
categories: [php]
---

作为一个程序员，你可能会经常听到cookie和session这一对好兄弟，下面简单介绍一下 他们。

<!--more-->

### 了解cookie
当登录一个网站时，网站往往会请求用户输入用户名和密码，并且用户可以勾选“下次自动登录”。如果勾选了，那么下次访问同一网站时，用户会发现没输入用户名和密码就已经登录了。这正是因为前一次登录时，服务器发送了包含登录凭据（用户名加密码的某种加密形式）的Cookie到用户的硬盘上。第二次登录时，（如果该Cookie尚未到期）浏览器会发送该Cookie，服务器验证凭据，于是不必输入用户名和密码就让用户登录了。
### cookie分类
Cookie总是保存在客户端中，按在客户端中的存储位置，可分为内存Cookie和硬盘Cookie。内存Cookie由浏览器维护，保存在内存中，浏览器关闭后就消失了，其存在时间是短暂的。硬盘Cookie保存在硬盘里，有一个过期时间，除非用户手工清理或到了过期时间，硬盘Cookie不会被删除，其存在时间是长期的。所以，按存在时间，可分为非持久Cookie和持久Cookie。
### cookie的缺陷
+ Cookie会被附加在每个HTTP请求中，所以无形中增加了流量。
+ 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题。（除非用HTTPS）
+ Cookie的大小限制在4KB左右。对于复杂的存储需求来说是不够用的。[3]

### session是什么技术
session采用的是在服务器端保存状态数据的方案。当较多的用户数据长时间的储存在服务器上，会增加服务器的负担，因此session中的数据信息要尽可能的少。
### 关于session
+ session_id的名称可以修改么？可以通过session_name()来获取或者设置。
+ session_id的值可以修改么？可以通过session_id()来获取或者设置。
+ session文件在计算机中的保存路径可以修改么？可以通过session_save_path()来获取或者设置。windows系统上的默认值为“C:\Windows\Temp”。
+ 启动session会话后怎么做？通过session_start()函数启动回话后，接下来就可以注册session变量，PHP通过预定义数组来注册session变量，并且用isset()函数或者empty（）函数判断session变量是否注册。

### session和cookie的区别。
+ cookie机制采用的是在客户端保存的方案，也就是说cookie数据存放在用户的浏览器上，而session机制采用的是在服务器端保存的方案，即session数据存放在服务器端。
+ 单个cookie文件的大小在客户端限制是3字节，而session文件大小在服务器段没有限制。
+ 恶意网站可以通过暗中读取用户cookie的方式来盗取用户的隐私信息，因此，考虑到安全性，应当减少cookie的使用，转而使用session。
+ session将数据保存在服务器上，当访问增多时，会降低服务器的性能，因此，考虑到减轻服务器的负担，应当减少使用session，转而使用cookie。故建议在实际开发中，将重要的信息使用session保存，其他信息使用cookie保存。

## 总结
用户访问一个服务器，服务器首先检客户端是否含有session标识（session id）。如果客户端已经创建过session，则服务器会把他检索出来使用，如果没有，服务器会为他重新创建一个相关联的session id，并返回给客户端。用户浏览器收到这个session id后，会在硬盘的指定目录下生成客户端的session文件。文件的命名格为"sess"+session_id，文件中包含的是回话的具体内容。就这样建立一个回话后，下一次http请求时，用户浏览器会将当前域名下所有的cookie发给服务器，服务器根据cookie 中的session_id来读取保存在计算机中的相应session文件，并从session文件中获取会话的内容。

> 如有错误，欢迎指正！
