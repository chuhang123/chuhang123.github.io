---
title: angular和springmvc实现批量删除
date: 2017-10-21 20:14:05
tags: [SpringMVC, batch, http, delete, checkbox]
categories: angularjs
---

昨天实现了批量删除的功能，看到了stackoverflow和百度上均有相关的问题，于是决定记录一下。前台angularjs，后台SpringMvc。

<!--more-->

## checkbox使用
```
<tr ng-repeat="(key, object) in data.content">
     <td><input icheck type="checkbox" ng-model="object._checked"></td>
</tr>
```
当用户勾选复选框后，对象的_checked属性值为true，我们通过下面这个函数获取勾选的object,可以把这个函数放在公共service中，方便框架的其他地方调用。类似的，我们也可以根据自己的需求，修改_checked属性。
```
/**
 * 由某个数组中 筛选中被选中的元素，组成新的数组并返回
 * @param    {array}                 lists 原数组
 * @param    {string}                 key   健值 默认为 _checked
 * @return   {array}                       选中元素组成的数组
 * @author 梦云智 http://www.mengyunzhi.com
 * @DateTime 2017-10-17T15:05:18+0800
 */
self.getCheckedElementsByListsAndKey = function(lists, key) {
    if (typeof(key) === 'undefined') {
        key = '_checked';
    }

    var tempList = [];
    angular.forEach(lists, function(list) {
    	if (typeof(list[key]) !== 'undefined' && list[key] === true) {
    		tempList.push(list);
    	}
    });
    return tempList;
};
```

## 前后台对接
前台http请求
```
var data =  [1, 3, 4];		// 假设要删除id为1,3,4的记录
$http.delete('/FromMessage/batchDelete/' + data)
	.then(function success(response){
	  if (callback) {callback(response.status);}
	}, function error(response){
	  alert('FromMessage.batchDelete error: ', response);
	  if (callback) {callback(response.status);}
	});
```
后台代码
```
@ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/batchDelete/{fromMessageIds}")
    public void batchDelete(@ApiParam(value = "消息id数组") @PathVariable List<Integer> fromMessageIds) {
        fromMessageService.batchDelete(fromMessageIds);
        return;
    }
```
后台接受到的是一个数组。如果把数组放到delete方法的body中，由于不符合api规范，会被tomcat或这spring丢弃，后台就不能正确的接受body信息。

## 单元测试
功能实现后，为了降低代码的维护成本，我们进行单元测试。这里给出示例代码：
```
logger.info("模拟请求");
this.mockMvc.perform(delete("/FromMessage/batchDelete/" + fromMessage.getId() + ',' + fromMessage1.getId())
.header("x-auth-token", xAuthToken))
.andDo(document("FromMessage_batchDelete", preprocessResponse(prettyPrint())))
.andExpect(status().is(204));
```
注意请求的url
```
/FromMessage/batchDelete/2,3
```

## 总结
在进行开发的时候，实现复选框选中、后台接收数组等功能，感觉之前都实现过，但是由于记得不清楚，测试了多次也没能通过，还是及时的google能够节约解决问题的时间。
