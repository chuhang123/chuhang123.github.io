---
title: 学习闭包
date: 2018-02-01 19:22:34
tags: [closureu, 基础]
categories: js
---

在js中,有一个叫做垃圾回收器的东西,当函数执行完毕后,管理内存的本地方法会将函数中所创建的所有东西移除,因为通常函数执行完毕,我们不在需要这个函数中的东西了.那么问题来了,如果某个函数执行完毕后,我们仍然需要这个函数中的一个变量的值,应该怎么办呢?闭包是组织垃圾回收期将变量从内存中移除的方法,使我们在函数外面可以访问到该变量.

<!--more-->
闭包有以下两种形式:
+ 将变量始终保存在内存中.代码如下:
```
(function test() {
	temp = 123;
})();
// 输出123
console.log(temp);
```
在上述代码中,因为在test函数中定义变量时没有使用var,所以temp是全局的,所以在函数外,仍然可以正常的输出变量.因为这个变量是一个全局变量,不会被回收.
+  阻止垃圾回收器将变量从内存中移除.
```
var test = (function () {
	var name = 'mengyunzhi';

	return {
		age: 18,
		innerName: function() {
			return name;
		}
	}
})();

// 输出18
console.log(test.age);
// 输出mengyunzhi
console.log(test.innerName());
```
在函数被保存到test对象时,一个闭包就创建了.在函数的外面,我们可以动态的访问age变量和调用innerName函数,阻止了垃圾回收器将变量和函数从内存中移除.

又因为闭包使函数中的变量和方法永久的保存在了内存中,所以我们应该谨慎使用闭包,防止内存的浪费.

参考文献:
1.单页web应用,JS从前段到后端.[书籍]
2.[学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html) 