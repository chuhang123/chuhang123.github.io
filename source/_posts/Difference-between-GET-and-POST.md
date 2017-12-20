---
title: Difference between GET and POST
date: 2017-05-16 09:51:34
tags: 
	[GET, POST]
categories: English
---




 According to the online information and the books of PHP, I have sorted out the difference between GET and  POST to deepen memory and share with you. Intrinsical distincetion in them is that GET is used to query information but POST is used to update or save information. 
 
 <!--more-->
 
### security
 We might see some documents  sometimes display that GET is safe but  disply it is not safe sometimes. But whether GET is safe or not ? GET is displayed to be safe in the documents because  we can not change data by using GET.  And GET is displayed to be not safe in the documents because when we use GET to submit data, data will display in url.
 
###  The size of the data transfer
 
 + GET
 url is limited in special browser or server. For example, the length of url in IE browser is limited  as 2k+35 byters. As for other browsers, url might be limited by operating system instead of browsers. So when we use GET to transefer data, the length will be limited.
 
+ POST
 because POST dose not use url to transfer data, the size of data is not limited theoretically. Actually, web server will limite the size of data of POST(Generally does not affect). So when we upload massive data, we can only use POST.
 

 
###  Data encoding
As the GET data is displayed in the url, and url encoding is used in ASCII coding, so the data we submit  must be ASCII coding. If it is not ASCII coding, we need to convert.


### Default form
GET is the default action of form.

### Relationship with server
GET is used to get data from server, while POST is used to transfer data to server.