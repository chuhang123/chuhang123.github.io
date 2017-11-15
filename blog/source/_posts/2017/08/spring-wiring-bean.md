---
title: spring装配bean——自动化装配、java显式装配
date: 2017-08-01 11:00:39
categories: Spring
tags: [bean, 装配, 自动化]
---

当我们在使用Spring框架时，您可能会见到``@bean``注解，初学者可能会疑惑``@bean``是如何发挥作用的？带着这个疑问我们来探究spring装配bean的相关知识。

<!--more-->

## Spring配置bean的可选方案
spring提供了三种主要的装配机制
+ 隐式的自动化装配bean
+ 在java中显式的配置
+ 在XML中显式的配置

spring实战书中，建议在实际的项目中尽可能的使用自动配置的机制，显示配置越少越好。当必须要使用显示的配置时，建议优先使用JavaConfig，只有在你想使用便利的xml命名空间时，才应该使用xml。

## 自动化装配bean
+ 定义一个接口
```
package soundsystem;

public interface CompactDisc {

  void play();

}
```

+ 定义一个带有@Component注解的CompactDisc实现类SgtPeppers
```
package soundsystem;
import org.springframework.stereotype.Component;

@Component  //表明该类为组件类，并告知Spring为这个类创建bean
public class SgtPeppers implements CompactDisc {

  public void play() {
    System.out.println("this is a test");
  }

}
```

Spring会为SgtPeppers的bean设置ID为sgtPeppers，我们也可以指定bean的ID，比如我们要指定bean的ID为mengyunzhi，那么应该@Component("mengyunzhi")。

+ @ComponentScan注解启用了组件扫描
```
package soundsystem;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan		//启用组件扫描。注意：需要和@Configuration注解一起使用
public class CDPlayerConfig {
}
```

@ComponentScan默认会扫面与CDPlayerConfig（配置类）相同的包。即扫描soundsystem包以及这个包下的所有子包。那么他是怎么扫描的呢？他会查找带有@Component注解的类，并会在Spring中自动创建一个bean。
如果要需要设置组件扫描的包，可以使用@ComponentScan("com.my.package.first")，如果要扫描多个包，可以修改为@ComponentScan({"com.my.package.first","com.my.package.second"})

## 通过java代码装配bean
去除上例中的@ComponentScan注解和@Component注解，我们使用java代码显示声明bean。
```
package soundsystem;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CDPlayerConfig {
  
  @Bean
  public CompactDisc compactDisc() {
    return new SgtPeppers();
  }

}
```
@Bean注解会告诉spring该方法会返回一个对象，该对象即为产生的bean实例。默认bean的ID为方法名，我们也可以使用@Bean(name="xxxx")设置bean的ID。

## 延伸
+ 如果我们同时创建两个相同的bean，会怎么样呢？
```
@Bean
  public CompactDisc compactDisc() {
    return new SgtPeppers();
  }
  @Bean
  public CompactDisc anotherCompactDisc() {
    return new SgtPeppers();
  }
```
Spring不会创建两个完全相同的bean。所以，当我们创建第二个bean时，spring会拦截并返回已经创建的bean。

+ 如果您使用了SpringBoot框架，你可能会疑惑并没有看到@Configuration、@ComponentScan注解，那是因为我们经常会一起使用@Configuration, @EnableAutoConfiguration 和 @ComponentScan，所以@SpringBootApplication等同于@Configuration, @EnableAutoConfiguration and @ComponentScan。另外，当我们使用@Service, @Repository, @Controller注解时，spring会认为该类为组件类，spring也会为我们创建bean。
+ 当我们打开idea的spring来查看项目为我们创建的bean时，我们会发现一些接口如WorkRepository，并没有使用任何注解，但是生成了bean，这是为什么呢？那是因为 @EnableAutoConfiguration也有@EnableJpaRepositories的功能，basePackage配置项会自动扫描当前包下的Repository并生成bean。