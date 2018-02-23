---
title:  ArrayList、LinkedList和HashSet的学习总结
date: 2017-11-15 09:00:51
tags: [ArrayList, LinkedList, HashSet, iterator, 数组]
categories: java
---

java中，一旦程序定义了数组的长度，就不能修改这个数组的长度了。如果我们需要修改数组的长度，我们可以使用ArrayList，以达到改变数组长度的目的。

## 类ArrayList
ArrayList的缺点：
+ ArrayList比数组的效率低
+ ArrayList只能存储对象，不能包含基本类型，比如int、double。

ArrayList的语法：
```
ArrayList <Base_Type> Variable = new ArrayList<Base_Type>(Capacity);
```
其中，Base_Type必须为类类型，不能为基本类型。Capacity（容量）表示为这个数据项分配内存空间，如果不传值，默认初始容量为10个数据项。如果初始化给了足够大的初始容量，那么系统就不需要频繁的分配内存了，程序将会运行的更快。反之，如果你吧初始容量弄得太大，就会浪费储存空间。
我们对是否分配容量做一个测试，代码实例：
```
public class ListDemo {

	static long timeList(List<String> st) {
		long start = System.currentTimeMillis();
		for (int i = 0; i < 100000; i++) {
			st.add(String.valueOf(i));
		}

		return System.currentTimeMillis() - start;
	}

	public static void main (String args[]) {
		System.out.println("assign capacity ArrayList = "
		 + timeList(new ArrayList<String>(100000)));

		System.out.println("default ArrayList = "
		 + timeList(new ArrayList<String>()));
	}
	
}
```
结果如下：
```
assign capacity ArrayList = 22
default ArrayList = 13
```

jdk7之前，我们应该这样实例化ArrayList
```
List<Integer> integers = new ArrayList<Integer>();
```
jdk7开始，我们可以这样
```
List<Integer> integers = new ArrayList<>();
```
不仅方便了我们书写，也使代码有更强的可读性。

## 类LinkedList
类LinkedList的基本用法同上，但是LinkedList内部使用双向链表的数据结构，只有在需要时才分配内存，删除元素时随即释放内存。

## 类ArrayList和类LinkedList的比较
+ 类LinkedList插入元素效率高，但访问元素效率低。
+ 类ArrayList访问元素效率高，但插入效率低。
他们的效率相差多少，我们通过实例来了解（仅修改main方法）：
```
public static void main (String args[]) {
	System.out.println("time for ArrayList = "
	 + timeList(new ArrayList<String>()));

	System.out.println("time for LinkedList = "
	 + timeList(new LinkedList<String>()));
}
```
运行结果：
```
time for ArrayList = 22
time for LinkedList = 13
```
如果我们指定位置添加元素，将第六行代码``st.add(String.valueOf(i));``修改为``st.add(0, String.valueOf(i));``
运行结果为：
```
time for ArrayList = 915
time for LinkedList = 11
```
为什么会差这么多呢，因为每插入一个元素，arraylist都要吧所有的元素都后移，而LinkedList指需要增加一个新的结点，并调整一下对应关系就可以了。
我们进行一次新增元素，再进行一次查看元素，他们的效率相差多少呢？将``timeList``修改为如下所示：
```
static long timeList(List<String> st) {
	long start = System.currentTimeMillis();
	for (int i = 0; i < 100000; i++) {
		st.add(String.valueOf(i));
	}
	for (int i = 0; i < 10000; i++) {
		st.get(i);
	}

	return System.currentTimeMillis() - start;
}
```

结果如下
```
time for ArrayList = 17

time for LinkedList = 156
```

因此，我们在进行相同次数的查找和添加元素的情况下，ArrayList效率较高。因此，我们使用ArrayList的次数会更多一些。

## Collection API的层次结构
通过上面的学习，我们对动态数据结构有了基本的认识，那么java中关于数组的接口和实现类的层次结构是什么样的呢？如下图：
<img src="/images/101.png" >
由上图可知，Iterable接口、Collection接口中定义的方法，几个实现类都实现了，只不过他们的具体实现方法会有所差异。同样的，ArrayList和LinkedList都是List接口的实现类，所以他们的方法名都是一样的，但是具体的实现方法有所差异。

## Set接口和List接口
1.Set对应的中文名是集合，有两个特点：
+ 不含重复元素
+ 无序

2.List接口类似于书续重的序列，也有两个特点：
+ 可含重复的元素
+ 有序

## 类HashSet
HashSet继承了Set接口的特性，值得注意的是，当一个对象被存储进HashSet集合中以后，就不能修改这个对象中的那些参与计算哈希值的字段了，否则，对象修改后的哈希值与最初存储进HashSet集合中时的哈希值就不同了，在这种情况下，即使在contains方法中使用该对象的当前引用作为的参数去HashSet集合中检索对象，也将返回找不到对象的结果。因为new一个HashSet，实际上是new HashMap，并以这个对象的hashCode为key，这个对象本身为value储存。当对象的hashcode改变后，我们可以使用迭代器进行删除的操作，代码如下：
```
Iterator<MandatoryInstrument> iterator = mandatoryInstrumentList.iterator();
while (iterator.hasNext()) {
    MandatoryInstrument mandatoryInstrument = iterator.next();
    if (mandatoryInstrument.getCheckDepartment() == null) {
        iterator.remove();
        continue;
    }
}
```
## iterator
iterator（迭代器）是什么？eg：
```
for (int i = 0; i < 10000; i++) {
   st.get(i);
}
```
那么，i就是一个迭代器——能够以合理的方式一次访问一个元素、遍历整个数组或者链表的变量。从一个元素走到另一个元素的过程就是是迭代（iterable）