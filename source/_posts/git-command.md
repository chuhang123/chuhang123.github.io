---
title: git常用指令
date: 2017-06-26 22:39:45
tags: [git]
---

在日常的开发中，经常会用到一些git指令，但是有些git指令不是太常用，用的时候经常忘记，每次都要重新google。于是，就把一些时常会用到的git 指令记录下来，方便以后使用。

<!--more-->
> 假设以下所有分支名为test

## 删除分支
+ 删除本地分支``git branch -d test``
+ 删除远程分支``git branch -r -f  test``，``git push origin :test``

## 查看分支
+ 查看本地分支 ``git branch``
+ 查看远程分支和本地分支``git branch -a``
+ 查看所有远程分支``git branch -r ``

## 新建分支
+ 新建，但不切换``git branch test``
+ 新建并且换``git checkout -b test``

## 将代码添加至暂存区并提交
+ 添加当前目录的所有文件到暂存区``git add ..``
+ 提交代码``git commit -m 'commit info'``

## 合并分支
+ 合并分支`` git merge test``
+ 合并后，如果有冲突，显示冲突文件``git status``

## 配置用户名密码
对于私有项目，我们每次对远程仓库操作，都需要输入用户名密码。解决方法
+ ``git config credential.helper store``
+ ``git pull``,输入用户名密码后，用户名密码将会被存储。
+ ``git pull -u``改变用户名密码

## 其他
+ 最近5次commit``git log -5 --pretty --oneline``
+ 切换到某节点``git checkout bd26839``
+ 新建一个commit，用来撤销指定commit``git revert bd26839``
+ 撤销上一次的提交，相当于github中的undo操作``git reset HEAD~ ``
+ 回复上次的提交代码``git revert bd26839``
+ 强制更新远程分支：git push -f <remote> <branch>
+ 将某个文件夹下的文件切换到某分支： git checkout development Webapp/app/index.html