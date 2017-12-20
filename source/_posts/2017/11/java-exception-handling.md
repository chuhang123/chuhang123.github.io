---
title: java异常处理学习
date: 2017-11-20 13:56:47
tags: [exception, throw, catch, try, error]
categories: java
---

在开发 程序的过程中，我们可能经常会和异常打交道，那么出现异常时我们应该怎么处理呢，我们一起来学习一下。

<!--more-->

## 基本异常处理
java提供了在程序中处理某些特定类型条件的方法，能够把程序或方法划分为正常情况或异常情况两部分。异常是一个对象，创建这个对象的过程，也被称为抛出异常。实例如下：
```
public void LearnException(int i) {
	try {
	    if (i < 1)  {
                throw new ArithmeticException("请传入大于0的整数");
            }
	    int result = 100/i;
	} catch (ArithmeticException e) {
	    System.out.println("出现异常了");
	}
}
 ```
 从上面这个例子我们可以看出，java处理异常的基本方式有try-throw-catch三元组成。
 + try语句块。try是尝试的意思，try语句块中的代码通常是你不能百分之百的确定，但是你想进行一次尝试。它的基本轮廓如下；
 ```
 try {
    Code_To_Try
    Possibly_Throw_An_Exception
    More_Code
}
 ```
 + throw语句块。上述的例子，也等同与如下代码：
 ```
ArithmeticException arithmeticException = new ArithmeticException("请传入大于0的整数");
throw arithmeticException;
 ```
 实际上，就是new一个异常对象，然后抛出的过程。当异常被抛出时，该块中的代码停止执行，跳出try语句块。
 + catch语句块。其格式如下：
 ```
 catch (ArithmeticException e) {
    Handling_Exception
}
 ```
 标识符e就像一个参数，接收刚才抛出的异常，所以e的类型必须等同于抛出的异常类型，否则不能捕获异常。
 
## 定义自己的异常类
 我们也可以自己定义一个异常类，但必须继承已经定义好的异常类的。代码如下：
 ```
 public class DivideByZeroException extends Exception {
    public DivideByZeroException() {
        super("请传入大于0的整数");		// 调用基类Exception的构造器
    }
    public DivideByZeroException(String message) {
        super(message);	// 调用基类Exception的构造器
    }
}
 ```
 调用方法如下：
 ```
 try {
    if (i < 1)  {
        throw new DivideByZeroException();
    }
    int result = 100/i;
} catch (DivideByZeroException e) {
    System.out.println("出现异常了");
}
 ```
 当我们自己定义异常类时，我们需要注意一下三点：
 + 如果你没有更合理的理由使用其他的异常类作为基类，那么就使用Exception作为基类。
 + 你定义的异常类至少定义了两个构造器——一个默认构造器，一个拥有String参数的构造器。通常情况下，自己定义的异常类都要保留getMessage方法。
 + 在每一个构造器中，你应该以对基类构造器的调用作为开始，使用super调用。
 
 > 如果你在写代码时就已经清楚可能会抛出异常，那么最后自己定义一个异常，这样当出现异常时，我们就更容易区分你的异常和预定义类中的异常。
 
## 声明异常
 有时候我们需要延迟处理异常。比如你有一个代码块可能会抛出异常，但你并不想在这个代码块中捕获异常。因为可能某些程序调用该方法抛出异常后应该简单的终止程序，而另一程序调用该方法抛出异常后要做一些其他的处理。所以，当出现类似这种情况时，我们需要在在方法头部声明异常。代码如下：
 ```
public void LearnException(int i) throws DivideByZeroException {
	Code_To_Try
	throw new DivideByZeroException();
	More_Code
}
 ```
 如果方法抛出了异常，方法调用立即结束。在方法的首部声明异常的一个好处是，我们可以清楚的区分可能有异常的方法和没有异常的方法，易于阅读。
 > 关键字throw用于抛出异常，throws用于声明异常。
 
## 异常的种类
所有的java异常可以分为两类：可控异常，不可控异常。上述的异常属于可控异常，即：异常必须在catch快中捕获或者在方法的首部声明。不可控异常也称为运行时异常（RuntimeException），当出现此类异常时，通常我们应该修正自己的代码，而不是添加catch语句块。

## 多重捕获和finally
+ 多重捕获。一个try语句块可以抛出任意数量的异常，这些异常可以是不同的类型，因为一个catch语句块只能捕获一种异常，所以一个try语句块可以使用多个catch语句块。
+  finally关键字 。无论代码是否发生异常，finally中的代码块总会被执行。
代码如下：
```
try {
    // do sth
} catch (DivideByZeroException e1) {
    // do sth
} catch (IOException) {
    // do sth
} finally {
    // do sth
}
```
## 总结
<img src="/images/102.png" >
+ 我们应该在什么时候抛出异常呢？在 [When to throw an exception?](https://stackoverflow.com/questions/77127/when-to-throw-an-exception) 中，推荐：当发现当前代码块的基本假设是错误时，应该抛出异常。
+ 对于所有的异常都捕获Exception是否可行？可行但是不推荐。最好catch更为精确的异常。
+ 在catch语句块中使用``e.printStackTrace()``是一个好的习惯么？并不推荐使用这种方法，很多情况下，并不能正确的提示代码出错的位置和相关信息。最好使用在控制台打印的方法。

> error---错误 ： 是指程序无法处理的错误.比如内存溢出、端口占用、断言错误等。
 
参考文献：
1. 《Java程序设计与问题解决》
2. [Java 异常处理](http://www.runoob.com/java/java-exceptions.html) 
3. [When to throw an exception?](https://stackoverflow.com/questions/77127/when-to-throw-an-exception) 
4. [Why is exception.printStackTrace() considered bad practice?](https://stackoverflow.com/questions/7469316/why-is-exception-printstacktrace-considered-bad-practice) 