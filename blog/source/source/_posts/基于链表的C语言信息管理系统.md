---
title: 基于链表的C语言信息管理系统
tags:  [demo,链表]
categories: [数据结构]
date: 2017-05-13 09:51:34
---
这两天学习了朋友推荐的[C语言链表视频教程](http://study.163.com/course/courseMain.htm?courseId=1003284031) ，有了对链表的初步认识。教程用C对单向链表的实现了基本的增删改查操作，以及将数据储存到文件中和从文件中读取的功能。

<!--more-->

### 认识链表
![ ](https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg  "图片")
上图为单向链表的模型，图中包含三个节点，且每个节点包含两个部分，一部分保存或者显示节点的有关信息，一部分储存下一个节点的地址。从第一个节点依次指向最后一个节点，最后一个节点指向一个空值。如果需要查找链表的节点，则需要依次遍历节点。

### 功能需求
基于C语言链表，实现对学生表的基本增删改查操作，将学生数据保存至文件中，从文件中取出。并逐步完善系统，如在链表头和尾及指定位置增加学生信息，恢复删除学生信息等功能。
### 整体规划
定义学生节点STUNODE，声明链表的头和尾g_pHead，g_pEnd，使用switch语句，针对不同的指令，执行不同的命令。搭建学生信息管理系统的骨架。
```
//学生结点
typedef struct _STU
{
	char arrStuNum[10];
	char arrStuName[10];
	int iStuScore;
	struct _STU* pNext;
} STUNODE;

//声明链表的头和尾
STUNODE* g_pHead = NULL;
STUNODE* g_pEnd = NULL;
```
### 删除功能
以删除功能为例，具体说明。分成只有一个节点或者多个节点两种情况讨论。

+  只有一个节点。
```
//只有一个节点
if (g_pHead == g_pEnd) {
	free(g_pHead);		//删除节点
	g_pHead = NULL;		//把链表头赋值为NULL
	g_pEnd = NULL;		//把链表尾赋值为NULL
	return;				//完成
}
```

+  有多个节点。这种情况又需要讨论了，分为链表的头、尾、中间三种。
```
//如果是首节点
if (g_pHead == pNode) {
	free(g_pHead);				//删除节点
	g_pHead = g_pHead->pNext;	//指向想一个节点
	return;						//完成
}
//如果是尾节点
STUNODE* pTemp = g_pHead;
if (g_pEnd == pNode) {
	//找到倒数第二个节点，并将指向空
	while (pTemp->pNext != pNode) {
		pTemp = pTemp->pNext;
	}
	pTemp->pNext = NULL;		
	g_pEnd = pTemp;				//把倒数第二个链表赋值为链表尾
	free(pNode);				//删除节点
	return;						//完成
}	

//如果是中间节点
if (pNode != g_pHead && pNode != g_pEnd && g_pHead != g_pEnd) {
	//找出要删除的节点前一个
	while (pTemp->pNext != pNode) {
		pTemp = pTemp->pNext;
	}
	pTemp->pNext = pNode->pNext;	//剔除节点
	free(pNode);					//删除节点
	return;							//完成
}
```
	
### 实现学生信息管理系统
完成增删改查后，把链表的节点的属性拼接起来，然后写入制定的文件中。读取时，拆分字符串，再将学生信息存入链表中。
效果如下：
{% asciinema 5r01vujvrx4b3d1jlpdnui1kb %}

代码如下：
```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
//学生结点
typedef struct _STU
{
	char arrStuNum[10];
	char arrStuName[10];
	int iStuScore;
	struct _STU* pNext;
} STUNODE;

//声明链表的头和尾
STUNODE* g_pHead = NULL;
STUNODE* g_pEnd = NULL;

//添加一个学生信息
void AddStuMSG(char arrStuNum[10], char arrStuName[10], int iStuScore);

//链表头添加一个节点
void AddStuMSGToLinkHead(char arrStuNum[10], char arrStuName[10], int iStuScore);

//清空链表
void FreeLinkData();

//打印数据
void ShowStuData();

//显示指令
void ShowOrder();

//指定位置插入节点
void InsertNode(STUNODE* pTemp, char arrStuNum[10], char arrStuName[10], int iStuScore);

//查找制定学生
STUNODE* FindStuByNum(char* arrStuNum);

//删除指定的学生
void DeleteStuNode(STUNODE* pNode);

//保存信息到文件中
void SaveStuToFile();

//读取文件中的学生信息
void ReadStuFromFile();

int main(void)
{
	int nOrder = -1;
	char arrStuNum[10] = {'\0'};
	char arrStuName[10] = {'\0'};
	int iStuScore = -1;
	int nFlag = 1;

	printf("***********学生信息管理系统************************\n");
	printf("***********本系统操作指令如下**********************\n");
	printf("***	  1、增加一个学生信息（尾添加）		***\n");
	printf("***	 11、增加一个学生信息（头添加）		***\n");
	printf("***	111、增加一个学生信息（在指定位置添加） ***\n");
	printf("***	  2、查找指定学生的信息（姓名/学号） 	***\n");
	printf("***	  3、修改指定学生的信息			***\n");
	printf("***	  4、保存业主的信息到文件中		***\n");
	printf("***	  5、读取文件的业主信息			***\n");
	printf("***	  6、删除指定学生的信息			***\n");
	printf("***	  7、恢复删除的学生的信息		***\n");
	printf("***	  9、显示所有学生的信息			***\n");
	printf("***	  0、退出系统				***\n");

	//读取文件中的学生信息
	ReadStuFromFile();

	while (nFlag)
	{
		printf("请输入指令(10查看指令):\n");
		//printf("%p\n", &nOrder);
		scanf("%d", &nOrder);

		switch (nOrder)
		{
		case 1:
			//添加一个学生信息
			printf("输入学生的学号\n");
			scanf("%s", arrStuNum);
			printf("输入学生的姓名\n");
			scanf("%s", arrStuName);
			printf("输入学生的分数\n");
			scanf("%d", &iStuScore);

			AddStuMSG(arrStuNum, arrStuName, iStuScore);
			break;
		case 11:
			//添加一个学生信息
			printf("输入学生的学号\n");
			scanf("%s", arrStuNum);
			printf("输入学生的姓名\n");
			scanf("%s", arrStuName);
			printf("输入学生的分数\n");
			scanf("%d", &iStuScore);

			AddStuMSGToLinkHead(arrStuNum, arrStuName, iStuScore);
			break;
		case 111:
			//指定位置添加学生
			printf("输入指定学号\n");
			scanf("%s", arrStuNum);

			STUNODE* pTemp;
			pTemp = FindStuByNum(arrStuNum);
			if (NULL != pTemp) {
				printf("输入学生的学号\n");
				scanf("%s", arrStuNum);
				printf("输入学生的姓名\n");
				scanf("%s", arrStuName);
				printf("输入学生的分数\n");
				scanf("%d", &iStuScore);

				InsertNode(pTemp, arrStuNum,  arrStuName, iStuScore);
			}
			break;
		case 2:
			//查找指定学生的信息
			printf("输入指定学号\n");
			scanf("%s", arrStuNum);

			pTemp = FindStuByNum(arrStuNum);

			//打印
			if (NULL != pTemp) {
				printf("学号:%s, 姓名:%s, 分数:%d\n", pTemp->arrStuNum, pTemp->arrStuName, pTemp->iStuScore);
			}
			break;
		case 3:
			//查找指定学生的信息
			printf("输入指定学号\n");
			scanf("%s", arrStuNum);

			//查找
			pTemp = FindStuByNum(arrStuNum);

			//打印
			if (NULL != pTemp) {
				//修改学号
				printf("请输入学号\n");
				scanf("%s", arrStuNum);
				strcpy(pTemp->arrStuNum, arrStuNum);

				//修改名字
				printf("请输入姓名\n");
				scanf("%s", arrStuName);
				strcpy(pTemp->arrStuName, arrStuName);

				//修改分数
				printf("请输入分数\n");
				scanf("%d", &iStuScore);
				pTemp->iStuScore = iStuScore;
			}

			break;
		case 4:
			//保存学生信息
			SaveStuToFile();
			break;
		case 6:
			//删除一个节点 
			printf("输入要删除的学生的学号\n");
			scanf("%s", arrStuNum);

			//查找
			pTemp = FindStuByNum(arrStuNum);

			//删除一个节点
			if (NULL != pTemp) {
				DeleteStuNode(pTemp);
			}

			break;
		case 7:
			//恢复
			FreeLinkData();
			g_pHead = NULL;
			g_pEnd = NULL;
			ReadStuFromFile();
			break;
		case 9:
			ShowStuData();
			break;
		case 10:
			//查看指令
			ShowOrder();
			break;
		case 0:
			nFlag = 0;
			break;
		default:
			printf("not right\n");
		}
	}

	//保存学生信息
	SaveStuToFile();

	//释放链表
	FreeLinkData();
	return 0;
}

//添加一个学生信息
void AddStuMSG(char arrStuNum[10], char arrStuName[10], int iStuScore)
{
	//逻辑
	//创建一个节点
	STUNODE* pTemp = (STUNODE*)malloc (sizeof (STUNODE));
	//检验参数的合法性
	if (NULL == arrStuNum || NULL == arrStuName || iStuScore < 0) {
		printf("学生信息输入错误！\n");
		return;
	}

	//赋值
	strcpy(pTemp->arrStuNum, arrStuNum);
	strcpy(pTemp->arrStuName, arrStuName);
	pTemp->iStuScore = iStuScore;
	pTemp->pNext = NULL;

	//接在链表上
	if (NULL == g_pHead || NULL == g_pEnd) {
		g_pHead = pTemp;
	} else {
		g_pEnd->pNext = pTemp;
	}
	g_pEnd = pTemp;

} 

void FreeLinkData()
{
	STUNODE* pTemp = g_pHead;
	while (g_pHead != NULL) {
		//记录结点
		pTemp = g_pHead;
		//向后移动一个
		g_pHead = g_pHead->pNext; 
		//删除节点
		free(pTemp);
	}
}

//打印数据
void ShowStuData()
{
	STUNODE* pTemp = g_pHead;
	while (NULL != pTemp)
	{
		printf("学号:%s, 姓名:%s, 分数:%d\n", pTemp->arrStuNum, pTemp->arrStuName, pTemp->iStuScore);
		//向下走一步
		pTemp = pTemp->pNext;
	}
}

//显示指令
void ShowOrder()
{
	printf("***********学生信息管理系统************************\n");
	printf("***********本系统操作指令如下**********************\n");
	printf("***	  1、增加一个学生信息（尾添加）		***\n");
	printf("***	 11、增加一个学生信息（头添加）		***\n");
	printf("***	111、增加一个学生信息（在指定位置添加） ***\n");
	printf("***	  2、查找指定学生的信息（姓名/学号） 	***\n");
	printf("***	  3、修改指定学生的信息			***\n");
	printf("***	  4、保存业主的信息到文件中		***\n");
	printf("***	  5、读取文件的业主信息			***\n");
	printf("***	  6、删除指定学生的信息			***\n");
	printf("***	  7、恢复删除的学生的信息		***\n");
	printf("***	  9、显示所有学生的信息			***\n");
	printf("***	  0、退出系统				***\n");
}

void AddStuMSGToLinkHead(char arrStuNum[10], char arrStuName[10], int iStuScore)
{
	//创建一个节点
	STUNODE* pTemp = (STUNODE*)malloc(sizeof(STUNODE));
	//检测参数合法性
	if (NULL == arrStuNum || NULL == arrStuName || iStuScore < 0)
	{
		printf("学生信息输入错误！\n");
		return;
	}

	strcpy(pTemp->arrStuNum, arrStuNum);
	strcpy(pTemp->arrStuName, arrStuName);
	pTemp->iStuScore = iStuScore;
	pTemp->pNext = NULL;

	//链表为空
	if (NULL == g_pHead || NULL == g_pEnd) {
		g_pEnd = pTemp;
	} else {
		pTemp->pNext = g_pHead;
	}
	
	g_pHead = pTemp;

}

//查找制定学生
STUNODE* FindStuByNum(char* arrStuNum)
{
	STUNODE* pTemp = g_pHead;
	//判断参数的合法性
	if (NULL == arrStuNum) {
		printf("学号输入错误！\n");
		return NULL;
	}

	//判断链表是否为空
	if (NULL == g_pHead || NULL ==g_pEnd) {
		printf("链表为NULL！\n");
		return NULL;
	}

	//遍历链表
	while (NULL != pTemp) {
		if (0 == strcmp(pTemp->arrStuNum, arrStuNum)) {
			return pTemp;
		}

		pTemp = pTemp->pNext;
	}
	printf("查无此节点！\n");
	return NULL;
}

//指定位置插入节点
void InsertNode(STUNODE* pTemp, char arrStuNum[10], char arrStuName[10], int iStuScore)
{
	//创建节点
	STUNODE* pNewTemp = (STUNODE*)malloc(sizeof(STUNODE));

	//成员赋值
	strcpy(pNewTemp->arrStuNum, arrStuNum);
	strcpy(pNewTemp->arrStuName, arrStuName);
	pNewTemp->iStuScore = iStuScore;
	pNewTemp->pNext = NULL;

	//判断插入位置是否为未结点
	if (pTemp == g_pEnd) {
		g_pEnd->pNext = pNewTemp;
		g_pEnd = pNewTemp;
	} else {
		pNewTemp->pNext =  pTemp->pNext;
		pTemp->pNext =  pNewTemp;
	}
}

//删除指定的学生
void DeleteStuNode(STUNODE* pNode)
{
	//只有一个节点
	if (g_pHead == g_pEnd) {
		free(g_pHead);
		g_pHead = NULL;
		g_pEnd = NULL;
		return;
	}

	//如果是首节点
	if (g_pHead == pNode) {
		free(g_pHead);
		g_pHead = g_pHead->pNext;
		return;
	}
	//如果是尾节点
	STUNODE* pTemp = g_pHead;
	if (g_pEnd == pNode) {
		while (pTemp->pNext != pNode) {
			pTemp = pTemp->pNext;
		}
		pTemp->pNext = NULL;
		g_pEnd = pTemp;
		free(pNode);
		return;
	}

	//如果是中间节点
	if (pNode != g_pHead && pNode != g_pEnd && g_pHead != g_pEnd) {
		while (pTemp->pNext != pNode) {
			pTemp = pTemp->pNext;
		}
		pTemp->pNext = pNode->pNext;
		free(pNode);
		return;

	}
}

//保存信息到文件中
void SaveStuToFile()
{
	FILE* pFile = NULL;
	STUNODE* pTemp = g_pHead;
	char strBuf[30] = {0};
	char strScore[10] = {0};

	//判断链表中是否为null
	if (g_pHead == NULL) {
		printf("没有学生\n");
		return;
	}

	//打开文件
	pFile = fopen("dat.dat", "wb+");
	if (NULL == pFile) {
		printf("文件打开失败！\n");
		return;
	}
	//操作文件指针
	while (NULL != pTemp) {
		//学号赋值进去
		strcpy(strBuf, pTemp->arrStuNum);
		strcat(strBuf, ".");
		//姓名
		strcat(strBuf, pTemp->arrStuName);
		strcat(strBuf, ".");
		//分数
		snprintf(strScore, 10, "%d", pTemp->iStuScore);  //linux下不能使用itoa函数，故用此代替
		//拼接字符串
		strcat(strBuf, strScore);

		fwrite(strBuf, 1, strlen(strBuf), pFile);
		fwrite("\r\n", 1, strlen("\r\n"), pFile);

		pTemp = pTemp->pNext;
	}
	//关闭文件
	fclose(pFile);
}

//读取文件中的学生信息
void ReadStuFromFile()
{
	FILE* pFile = fopen("dat.dat", "rb+");
	char strBuf[30] = {0};
	char strStuNum[10] = {0};
	char strStuName[10] = {0};
	char strStuScore[10] = {0};
	int nCount = 0;
	int iStuScore;


	if (NULL == pFile) {
		printf("文件打开失败\n");
		return;
	}

	//操作指针读取函数
	
	while (NULL != fgets(strBuf, 30, pFile)) {
		int i = 0;
		int j = 0;
		int nCount = 0;
		for (i = 0; strBuf[i] != '\r'; i++) {
			//没到.
			if (0 == nCount) {
				strStuNum[i] = strBuf[i];
				if ('.' == strBuf[i]) {
					strStuNum[i] = '\0';
					nCount++;
				}
			} else if (1 == nCount) {
				if ('.' != strBuf[i]) {
					strStuName[j] = strBuf[i];
					j++;
				}
				if ('.' == strBuf[i]) {
					strStuName[j] = '\0';
					nCount++;
					j = 0;
				}
				
			} else {
				strStuScore[j] = strBuf[i];
				j++;
			}
		}
		//将学生的分数转化为int类型
		iStuScore = strtol(strStuScore, NULL, 10);
		AddStuMSG(strStuNum, strStuName, iStuScore);
	}
	fclose(pFile);
}

```