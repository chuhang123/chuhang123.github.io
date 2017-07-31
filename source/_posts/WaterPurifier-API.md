---
title: 净水器API
date: 2017-06-29 10:30:09
tags: API
---

净水器方提供API接口，负责处理单个净水器的请求信息。如获取充值信息，用户使用饮水机信息等。

<!--more-->

# API列表
+ [getCurrentTime](./#getCurrentTime)  ，获取服务器当前时间
+ [getRechargeInfo](./#getRechargeInfo) ， 获取充值信息
+ [isRechargeOk](./#isRechargeOk)  ，是否充值成功
+ [useInfo](./#useInfo) ，净水器使用信息

# getCurrentTime 
获取服务器当前时间

## URL
https://api.water.mengyunzhi.com/getCurrentTime 

## 支持格式
JSON

## HTTP请求方式
GET

## 请求参数
无

## 请求示例
```
GET /api/getCurrentTime HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Host: https://api.water.mengyunzhi.com
```

## 响应结果示例
```
HTTP/1.1 200 OK
Content-Type: text/plain;charset=ISO-8859-1
Content-Length: 10
  
1498891791
```

# getRechargeInfo
获取充值水量

## URL
https://api.water.mengyunzhi.com/getRechargeInfo

## 支持格式
JSON

## HTTP请求方式
GET

## 请求参数
+ id。类型：Long。说明：净水器编号。
+ timestamp。类型：String。说明：时间戳。
+ randomString。类型：String。说明：随机生成的字符串。
+ encryptionInfo。类型：String。将timestamp、randomString、"mengyunzhi"进行字符串拼接（格式：timestamp + randomString + "mengyunzhi"），并对拼接结果进行sha1加密，生成encryptionInfo。

## 请求示例
```
GET /api/getRechargeInfo?id=23213&timestamp=1497457292548&randomString=unzdtggyopn1fl7sx68b8olxr&encryptionInfo=37cde59cfa3384c84d9bf7545be348bc880c79bd HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Host: https://api.water.mengyunzhi.com
```

## 响应结果示例
```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Content-Length: 2
   
20
```

# isRechargeOk
是否充值成功

## URL
https://api.water.mengyunzhi.com/isRechargeOk

## 支持格式
JSON

## HTTP请求方式
POST

## 	请求参数
+ id。类型：Long。说明：净水器编号。
+ shouldRecharge.。类型：int。说明：应该充值水量。
+ actualRecharge。类型：int。说明：实际充值水量。

## 请求头信息
+ timestamp。类型：String。说明：时间戳。
+ randomString。类型：String。说明：随机生成的字符串。
+ encryptionInfo。类型：String。将timestamp、randomString、"mengyunzhi"进行字符串拼接（格式：timestamp + randomString + "mengyunzhi"），并对拼接结果进行sha1加密，生成encryptionInfo。

## 请求示例
```
POST /api/isRechargeOk HTTP/1.1

Content-Type: application/json;charset=UTF-8
Host: https://api.water.mengyunzhi.com
Timestamp: 1497457292548
RandomString: unzdtggyopn1fl7sx68b8olxr
EncryptionInfo: 37cde59cfa3384c84d9bf7545be348bc880c79bd
   
{
	"id": 1,
	"shouldRecharge": 200,
	"actualRecharge": 200
}
```

## 响应结果示例
```
HTTP/1.1 200 OK
```
# useInfo
净水器使用信息

## URL
https://api.water.mengyunzhi.com/useInfo

## 支持格式
JSON

## HTTP请求方式
POST

## 	请求参数
+ id。类型：Long。说明：净水器编号。
+ usedBeforeWaterQuality。类型：int。说明：净水前水质。
+ usedAfterWaterQuality。类型：int。说明：净水后水质。
+ usedWaterQuantity。类型：int。说明：用水量。
+ lastInteractTime。类型：Long。说明：上次交互的时间戳。

## 请求头信息
+ timestamp。类型：String。说明：时间戳。
+ randomString。类型：String。说明：随机生成的字符串。
+ encryptionInfo。类型：String。将timestamp、randomString、"mengyunzhi"进行字符串拼接（格式：timestamp + randomString + "mengyunzhi"），并对拼接结果进行sha1加密，生成encryptionInfo。

## 请求示例
```
POST /api/useInfo HTTP/1.1
Content-Type: application/json;charset=UTF-8
Host: https://api.water.mengyunzhi.com
Timestamp: 1497457292548
RandomString: unzdtggyopn1fl7sx68b8olxr
EncryptionInfo: 37cde59cfa3384c84d9bf7545be348bc880c79bd
   
{
	"id": "1",
	"usedBeforeWaterQuality": 200,
	"usedAfterWaterQuality": 2030,
	"usedWaterQuantity": 2200,
	"lastInteractTime": 1497457292548
}	
```

## 响应结果示例
```
HTTP/1.1 200 OK
```