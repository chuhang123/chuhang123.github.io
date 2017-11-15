---
title: java中json和object相互转换
date: 2017-10-21 16:45:14
tags: [json, object, gson]
categories: java
---

我们经常会用到json和oject类型的相互转换，这篇文章记录了通过gson进行object和json的相互转换。

<!--more-->
## gson 依赖
```
<dependency>
    	<groupId>com.google.code.gson</groupId>
    	<artifactId>gson</artifactId>
    	<version>2.6.2</version>
</dependency>
```

## object转换为json
```
// 1.新建一个对象
FromMessage fromMessage = new FromMessage();
fromMessage.setContent("test");
fromMessage.setIsRead(Boolean.FALSE);

// 2.将对象转化为json字符串
Gson gson = new Gson();
String jsonString = gson.toJson(fromMessage);
System.out.println(jsonString);			// {"content":"test","isRead":false}
```
##  json转化为object
```
Gson gson = new Gson();
String jsonString = "{\"content\":\"test\",\"isRead\":false}";
FromMessage fromMessage1 = gson.fromJson(jsonString, FromMessage.class);
System.out.println(fromMessage1);  		//Message{id=null, content='test', title='null', isRead=false, fromDepartment=null, toDepartment=null, firstReadTime=null, firstReadUser=null, createUser=null, createTime=null}
```

参考文章：
[How to convert Java object to JSON string](https://www.mkyong.com/java/how-do-convert-java-object-to-from-json-format-gson-api/) 
