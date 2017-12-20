---
title: js的浅拷贝和深拷贝学习
date: 2017-10-08 16:31:00
tags:	[deep, shallow, copy, clone, assignment]
categories: js
---

最近做项目时，发现把A赋值给B，当我改变B时，A也随之改变了。google了一下，了解到在js中，当一个变量复制另一个变量时，其实复制的是一个地址，改变其中一个变量，另一个也会随之改变。

这种复制分两种情况：拷贝引用（浅拷贝）和拷贝实例（深拷贝）
<!--more-->

## 浅copy
+ 拷贝原对象的引用
```
var o1 = {a: 1};
var o2 = o1;

console.log(o1 === o2);  // =>true
o2.a = 2; 
console.log(o1.a); // => 2
```

+ 拷贝原对象的实例，但是对其内部的引用类型值，拷贝的是其引用
```
var o1 = ['darko', {age: 22}];
var o2 = o1.slice(); // 根据Array.prototype.slice()的特性，这里会返回一个o1的浅拷贝对象

console.log(o1 === o2); // => false，说明o2拷贝的是o1的一个实例

o2[0] = 'lee';
console.log(o1[0]); // => "darko" o1和o2内部包含的基本类型值，复制的是其实例，不会相互影响

o2[1].age = 23;
console.log(o1[1].age); // =>23 o1和o2内部包含的引用类型值，复制的是其引用，会相互影响
```
浅copy实现
```
function shallowClone(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
            targetObj[keys] = source[keys];
        }
    }
    return targetObj;
}
```

## 深copy
深copy有两种方法
+ 使用JSON.stringify和JSON.parse。
``JSON.parse(JSON.stringify(object))``。这种方法只能copy对象的属性，不能copy对象的方法。
+ 使用递归的方法实现
```
function deepClone(source){
   if(!source || typeof source !== 'object'){
     throw new Error('error arguments', 'shallowClone');
   }
   var targetObj = source.constructor === Array ? [] : {};
   for(var keys in source){
      if(source.hasOwnProperty(keys)){
         if(source[keys] && typeof source[keys] === 'object'){
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = deepClone(source[keys]);
         }else{
           targetObj[keys] = source[keys];
         }
      } 
   }
   return targetObj;
}
```


参考链接：
1. [JavaScript中的浅拷贝和深拷贝](https://segmentfault.com/a/1190000008637489) 
2. [javascript中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215) 