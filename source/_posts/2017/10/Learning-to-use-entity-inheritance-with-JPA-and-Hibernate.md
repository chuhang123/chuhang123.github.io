---
title: 学习hebinate继承映射关系
date: 2017-10-17 17:18:58
tags: [inheritance, JPA, entity, map]
categories: Hibernate
---

做计量项目我的消息模块时，消息分为接收消息和发送消息，如果把消息放在一个实体中，当删除发送消息时，对应的接受消息也被删除了，因此决定使用继承的方法。我们通过这个问题学习ＪＰＡ主要的三种映射策略。

## 问题还原
假设有三个类animal、cat、dog。cat、dog继承animal类
<img src="/images/96.png" >
那我们应该通过什么方法生成数据表，生成几张数据表呢，哪种方法最优呢？
## 单表继承策略
单表继承，就是这几个类共用一个数据表。代码如下：
```
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // 继承（策略 = 单表继承）
@DiscriminatorColumn(name = "DB_TYPE")  // 鉴别的列名为 DB_TYPE，将在数据表中生成该字段，用与区分子表类型
public abstract class Animal implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String age;
    // 省略constructor 、getters、setters
}

@Entity
@DiscriminatorValue("Cat")
public class Cat extends Animal {
    private String weight;
}

@Entity
@DiscriminatorValue("Dog")
public class Dog extends Animal {
    private String height;
}
```

生成了一张数据表：
<img src="/images/97.png" >

这种方法不仅简单，而且性能也是最优的。因为每个子类使用了@Entity注解，子类的属性都会被映射到Animal表的列中。
> 这种方法在子类中使用@NotNull注解会被hibernate忽略，因为如果你定义了Dog类的height属性不能为null，但是当保存cat类的数据时，height必然为null。

## JOINED策略
代码如下：
```
@Entity
@Inheritance(strategy = InheritanceType.JOINED) // 继承（策略 = TABLE_PER_CLASS）
public abstract class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)   // 不能使用自动生成主键策略
    private Long id;

    private String age;
}

@Entity
public class Dog extends Animal {
    private String height;
}

@Entity
public class Cat extends Animal {
    private String weight;
}
```

此时生成了三张表
<img src="/images/100.png" >
我们可以看到dog和cat表中并没有age属性当我们想获取age属性时，我们通过左链接的方式取值。

## TABLE_PER_CLASS策略
这种策略不能使用自动生成主键的策略，代码如下：
```
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS) // 继承（策略 = TABLE_PER_CLASS）
public class Animal {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)   // 不能使用自动生成主键策略
    private Long id;

    private String age;
}

@Entity
public class Cat extends Animal {
    private String weight;
}

@Entity
public class Dog extends Animal {
    private String height;
}
```
生成了三张数据表：
<img src="/images/98.png" >
如果把Animal改为abstract类，则只会生成两张表
<img src="/images/99.png" >

## 总结
学习了以上三种方式，那么我们在什么情况下使用他们呢？
+ 当父类的属性较多时，我们使用``InheritanceType.SINGLE_TABLE``策略，已达到最少可为空的列的数量。
+ 当父类的属性较少，而子类的属性较多时，我们使用``InheritanceType.JOINED``策略。
+ 当我们很少对父类进行操作时，我们使用``InheritanceType.TABLE_PER_CLASS``策略，这种方法倾向于把每一个类对应一个具体的表。