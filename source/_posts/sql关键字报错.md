---
title: mysql下hebinate使用sql关键字报错问题
date: 2017-06-06 20:04:52
tags: [sql,关键字, hebinate]
---

今天建立订单实体的时，不能生成sql文件，一直报错。当时挺无语的，开始的时候一点点吧字段都注释掉，怀疑字段名太长等，最终发现是数据表名是sql关键字。环境：mysql，hebinate，springMvc。

<!--more-->

## 错误信息
报错信息如下
```
org.hibernate.tool.hbm2ddl.SchemaExport  : HHH000389: Unsuccessful: drop table if exists order
2017-06-06 20:16:58.422 ERROR 8020 --- [  restartedMain] org.hibernate.tool.hbm2ddl.SchemaExport  : You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'order' at line 1
```

## 解决方法
+ 给实体起一个别名。
+ 将数据表换个名字

## 对比
之前在php的项目中使用mysql数据库建立订单表就是使用order表，但是并没有错误，所以这个报错应该主要是hebinate的原因。但是疑问的是user也是sql保留的关键字，但是使用hebinate建立user表为什么没有报错呢？所以最终还是要以运行结果为准。

## 总结
在sql的手册中这样说到，一条通用的规则是：如果你看到任何古怪的分析错，说命令包含任何这里列出的关键字做标识符， 那么你可以先试试用双引号把那个标识符括起来，看看问题是否消失。

> [sql中文手册](http://www.postgres.cn/docs/9.3/sql-keywords-appendix.html) 列出了sql的关键字。