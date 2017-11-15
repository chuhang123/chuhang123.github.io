---
title: 学习JPA的@OneToMany注解
date: 2017-10-09 15:05:43
tags: [JPA, OneToMany, 映射,  单向]
categories: Hibernate
---

在JPA中，最常用的关系大概就是一对多了。假设实体A、B的关系为A:B=1:n，通常情况下，我们会在B实体中使用@ManyToOne的注解。但是有时我们需要在A实体中使用@OneToMany的注解，那么我们应该怎么办呢？

> 以下代码中，假设实体One和Many的关系为One:Many=1:n

## 单向映射@OneToMany
我们只在One实体中使用注解，代码如下
```
@Entity
public class One {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    private String name;
    
    @OneToMany
    private List<Many> manys = new ArrayList<>();
    // 省略构造函数，getters and setters
}


@Entity
public class Many {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
    private String name;
}
```
生成的数据表如下：
```
MariaDB [springmvc]> select * from one;
+----+------+
| id | name |
+----+------+
|  1 | test |
+----+------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from many;
+----+------+
| id | name |
+----+------+
|  1 | test |
+----+------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from one_manys;
+--------+----------+
| one_id | manys_id |
+--------+----------+
|      1 |        1 |
+--------+----------+
1 row in set (0.00 sec)

```

+ 现在，我们如果想要在中间表中存一条记录，就必须先要保证many实体中存在一条记录，然后保存one对象时设置和many的关联关系？代码如下：
```
logger.info("新建One实体");
One one = new One();

logger.info("新建并保存Many实体");
Many many = new Many("test");
manyRepository.save(many);	// 能不能省略这行代码呢？

logger.info("保存");
List<Many> manies = new ArrayList<>();
manies.add(many);
one.setManys(manies);
oneRepository.save(one);
```
我们能不能省略``manyRepository.save(many);``，答案是可以的。直接在One实体中的@OneToMany注解后面加入括号(cascade = CascadeType.ALL, orphanRemoval = true)，JPA仍然会自动保存many实体。

+ 此时，如果我们把Many实体表中id为1的记录删除，会报一个外键约束的错误，我们需要先把one_manys表中的记录删除，才可以删除Many实体表中id为1的记录。这样是不是有点麻烦呢？有没有办法直接删除Many实体中的记录呢？我们在One实体中增加一个注解@JoinColumn就可以了，代码如下：

```
@Entity
public class One {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    private String name;
    @OneToMany
    @JoinColumn(name = "many_id")
    private List<Many> manys = new ArrayList<>();
}
```

数据表的结构如下：
```
MariaDB [springmvc]> select * from one;
+----+------+
| id | name |
+----+------+
|  1 | test |
+----+------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from many;
+----+------+---------+
| id | name | many_id |
+----+------+---------+
|  1 | test |       1 |
+----+------+---------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from one_manys;
ERROR 1146 (42S02): Table 'springmvc.one_manys' doesn't exist
```
这样就不会增加中间表了，此时我们可以直接删除many实体中的记录了。

## 双向映射@OneToMany
代码如下：
```
@Entity
public class Many {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
    private String name;

    @ManyToOne
    private One one;
}

@Entity
public class One {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    private String name;
    @OneToMany
    private List<Many> manys = new ArrayList<>();
}
```
生成的数据表如下：
```
MariaDB [springmvc]> select * from one_manys;
+--------+----------+
| one_id | manys_id |
+--------+----------+
|      1 |        1 |
+--------+----------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from many;
+----+------+--------+
| id | name | one_id |
+----+------+--------+
|  1 | test |      1 |
+----+------+--------+
1 row in set (0.00 sec)

MariaDB [springmvc]> select * from one;
+----+------+
| id | name |
+----+------+
|  1 | test |
+----+------+
1 row in set (0.00 sec)
```

## 总结
我们经常会用到实体间的关系，但是往往在实际的项目中，由于项目过于庞大，增加了学习成本。因此，比较好的学习方法就是在一个测试的项目中学习，减少学习成本。

参考链接：
[The best way to map a @OneToMany relationship with JPA and Hibernate](https://vladmihalcea.com/2017/03/29/the-best-way-to-map-a-onetomany-association-with-jpa-and-hibernate/) 