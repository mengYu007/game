﻿//解析查询字符串，然后返回包含所有参数的一个对象
function getQueryStringArgs(){
	//取得查询字符串并去掉开头的问号
	var qs = (window.location.search.length>0 ? window.location.search.substring(1) : ""),
	//保存数据的对象
	args = {},
	//取得每一项
	items = qs.length ? qs.split("&") : [],
	item = null,
	name = null,
	value = null,
	//在for循环中使用
	i = 0,
	len = items.length;
	//逐个将每一项添加到args对象中
	for(i = 0;i<len;i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		
		if(name.length){
			args[name] = value;
		}
	}
	return args;
}