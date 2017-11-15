---
title:  JS异步编程解决方法实例
date: 2017-07-05 23:04:07
tags: asynchronously
categories: js
---
在js中，如果函数B需要A的返回值，由于js的异步执行，我们会得到一个undefined，本文通过代码实例记录了js异步编程的4中解决方案。
<!--more-->
## 问题实例
函数A比较耗时，但是函数B需要函数A的返回结果，如果按我们正常的写法，应该是这样的
```
var self = this;
function A (arg) {
	setTimeout(function () {
　　　　　　	self.numA = 3 * arg;
	 	console.log("A的值是" + self.numA);
　　　　}, 500);
}
function B () {
	var numB = self.numA * 4;
	console.log("B的值是" + numB);
}
A(2);
B(3);
```
但是执行结果确实这样的
```
B的值是NaN
A的值是6
```
如果我们使用嵌套的方法，代码是横向扩展，很不美观，且不易阅读。有以下几种解决方案。
## 方案一：回调函数
代码如下：
```
var self = this;
function A (arg, callback) {
	setTimeout(function () {
　　　　　　	self.numA = 3 * arg;
	 	console.log("A的值是" + self.numA);
	 	callback();
　　　　}, 1000);
}
function B () {
	var numB = self.numA * 4;
	console.log("B的值是" + numB);
}
A(2, B);
```
输出结果如下：
```
A的值是6
B的值是24
```
是我们的期望结果
> 如果你想在函数A执行完setTimeout之后再执行函数B，那么通过回调函数是无法事项的。可以通过下面的方法实现。

## 方案二：Promises对象
还是按照上面的顺序，函数A需要在B前面执行。Promises对象的大致意思是没执行一个异步任务就返回一个promise对象，对象有then方法，允许有回调函数，可以这样写
```
var self = this;
function A() {
    return new Promise(function (resolve, reject) {
      	setTimeout(function () {
　　　　　  self.numA = 3;
	   console.log("A的值是" + self.numA);
	   resolve('Async Hello world');
　　　　}, 500);
    });
}
A().then(function (value) {
  	var numB = self.numA * 4;
	console.log("B的值是" + numB);
        console.log(value);    // => 'Async Hello world'
}).catch(function (error) {
    console.log(error);
});
```

Promise 的写法只是回调函数的改进，使用then方法以后，异步任务的两段执行看得更清楚了，除此以外，并无新意。在不同的js框架中使用会有所差别。
## 其他
除了以上两种方法，我们还可以通过事件的监听、发布/订阅等方法实现异步编程，但是不同的框架实现方法可能会有所差别。但是，作为一个初学者，我们应该抱着学习的心态使用回调函数，有助于理解js。

 参考文献：
1. [Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html) 
2. [JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/) 