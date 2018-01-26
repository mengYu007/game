//页面动画初始化，从服务器上获取信息
function getInfo(data1, moduleid) {
	//心跳包(2分钟)
	window.setInterval(heartbeat, 120000);
	//获取参数
	var param = {};
	try {
		param = getQueryStringArgs();
	} catch (error) {
		console.log(error.message);
	}
	if (!$.cookie('adtoyou')) {
		//产生一个cookie
		var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var res = "CK";
		for (var i = 0; i < 13; i++) {
			var id = Math.ceil(Math.random() * 35);
			res += chars[id];
		}
		//将这个值存入cookie
		$.cookie('adtoyou', res, { expires: 7 });
		param["cookie"] = res;
	} else {
		param["cookie"] = $.cookie('adtoyou');
	}

	//获取ua
	var ua = navigator.userAgent;
	param["ua"] = ua;
	param["referrer"] = encodeURIComponent(document.referrer);
	if (param["gocb"]) {
		param["gocb"] = encodeURIComponent(param["gocb"]);
	}
	if (param["ccb"]) {
		param["ccb"] = encodeURIComponent(param["ccb"]);
	}
	param["moduleid"] = moduleid;
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		data: {
			'myarray': JSON.stringify(param)
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error');
		},
		success: function (result) {
			if (result.message == "success") {
				if (result.go == "1") {
					location.href = decodeURIComponent(result.url);
				} else {
					if (result.amount <= 0) {
						showModal('recommend-modal');
					};
					data1.leftTimes = result.amount;
					//次数
					renderElement(result.amount, false);
					//规则
					getRule(result.amount, result.r_describe, result.odds_describe);
					//另外的两个游戏
					for (var i = 0; i < result.other.list.length; i++) {
						var map = result.other.list[i].map;
						var str = "<a class=\"recommend-li\"	href=\"" + map.url + "\"><i class=\"recommend-btn\"></i> <img src=\"" + map.picSLT + "\"/></a>";
						$(".recommend-body1").append(str);
					}
				}

			} else {
				console.log(result.message);
			}
		}
	});
	//加一个隐藏按钮
	$("#prize-list").append("<input type='button' onclick='hiddenclick();' style='display:none'>");
}

//心跳包
function heartbeat() {
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		data: {
			'myarray': '{"type":"heartbeat"}'
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		},
		success: function (result) {

		}
	});
}

//获取素材
function getCreative() {
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		async: false, //默认为true 异步
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log('Error');
		},
		success: function (result) {
			if (result.message == "success") {
				//设置奖品图片
				$(".J_modalShowPrize .J_gotoDetail").attr("src", result.popImg);
				$(".J_modalShowPrize .coupon-use span").html(result.buttonName);
				url = result.impTrakings;
				//点击图片
				$(".J_modalShowPrize .J_gotoDetail").unbind("click").click(function () {
					$(".J_modalShowPrize").hide();
					$.ajax({
						url: '接口',
						type: 'POST',
						dataType: "json",
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							console.log(textStatus);
						},
						success: function (result) {
							if (result.message == "success") {
								console.log("完成点击");
								window.location.href = url;
								//url = data.returnValue.impTrakings;
							} else
								alert(data.returnValue.message);
						}
					});
				});
				//点击领取地址
				$(".J_modalShowPrize .coupon-use").unbind("click").click(function () {
					$(".J_modalShowPrize").hide();
					reset();
					$.ajax({
						url: '接口',
						type: 'POST',
						dataType: "json",
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							console.log(textStatus);
						},
						success: function (result) {
							if (result.message == "success") {
								console.log("完成点击");
								window.location.href = url;
								//url = data.returnValue.impTrakings;
							} else
								alert(data.returnValue.message);
						}
					});
				});
				/** 关闭奖品弹框按钮 */
				$(".J_modalShowPrize .coupon-modal-close").unbind("click").click(function () {
					document.touchmove = null;
					$(".J_modalShowPrize").hide();
					if (data.leftTimes > 0) {
						//准备素材
						$.ajax({
							url: '接口',
							type: 'POST',
							dataType: "json",
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								console.log(textStatus);
							},
							success: function (result) {
								if (result.message == "goout") {
									location.href = decodeURIComponent(result.url);
								}
							}
						});
					}
					reset();
				});
			} else if (result.message == "goout") {
				location.href = decodeURIComponent(result.url);
			} else {
				url = "thanks";
			}
		}
	});
	return url;
}

//跳转到我的奖品
function seeShopingList() {
	location.href = "../record.html";
}

//解析查询字符串，然后返回包含所有参数的一个对象
function getQueryStringArgs() {
	//取得查询字符串并去掉开头的问号
	var qs = (window.location.search.length > 0 ? window.location.search.substring(1) : ""),
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
	for (i = 0; i < len; i++) {
		item = items[i].split("=");
		name = item[0];
		value = item[1];

		if (name.length) {
			args[name] = value;
		}
	}
	return args;
}

//页面离开
window.onbeforeunload = function () {
	$.ajax({
		url: '接口',
		type: 'POST',
		async: false,
		dataType: "json",
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		},
		success: function (result) {
			console.log(result);
		}
	});
}

//关闭规则的行为日志
function closeRule() {
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		data: {
			'myarray': '{"type":"closeRule"}'
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		},
		success: function (result) {

		}
	});
}

//隐藏按钮行为日志
function hiddenclick() {
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		data: {
			'myarray': '{"type":"hiddenClick"}'
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		},
		success: function (result) {

		}
	});
}
// 获取游戏规则
function getRule(amount, r_describe, odds_describe) {
	var result = { "code": "00000", "data": { "limitTimes": amount, "prizes": 8, "name": "测试3", "desc": r_describe, "leftTimes": amount, "title": "11", "rateInfo": odds_describe }, "success": true, "desc": "" };
	var data = result.data;
	renderElement(data.leftTimes, false);
	$(".rule-modal .description_text").html(data.desc);
	$(".rule-modal .probability_text").html(data.rateInfo);
}
/** 今日次数用完了弹框，关闭弹窗 */
$("#recommend-modal").on("click", ".close", function () {
	$("#recommend-modal").hide();
});

/** 根据id显示弹窗 */
function showModal(id) {
	$("#" + id).show();
}

/** 规则 */
var description = null, probability = null;
$(".rule").on("click", function () {
	//查看规则记录行为日志
	$.ajax({
		url: '接口',
		type: 'POST',
		dataType: "json",
		data: {
			'myarray': '{"type":"seeRule"}'
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		},
		success: function (result) { 

		}
	});

	$(".rule-modal").show(),
		$("#db-content").addClass("filter")
});
// 红包
function redbag(n,m){
	if(n<m){
		$("#flypack").show();
	}
}
// 公用的底部说明
function bottomTip(content){
	var tip = content || "*奖品与活动和设备生产商Apple Inc.公司无关";
	var p = document.createElement("p");
	p.setAttribute("style","width:100%;text-align:center;color:#fff;font-size:12px;position:fixed;bottom:0;left:0;right:0;");
	p.innerText = tip;
	document.body.appendChild(p);
}