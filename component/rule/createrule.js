! function (){
	var head = 	document.getElementsByTagName("head")[0];
	var link = document.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("href","../component/rule/rule.css");
	head.appendChild(link);
	var rule = document.createElement("div");
	rule.setAttribute("id","rule-modal");
	rule.setAttribute("id","rule-modal");
	rule.setAttribute("style","display:none");
	rule.setAttribute("class","rule-modal");
	document.body.appendChild(rule);
	$("#rule-modal").load("../component/rule/rule.html",function(){
		$("#rule-close").on("click",function() {
			closeRule();
			$(".rule-modal").hide(),
			$("#db-content").removeClass("filter"),
			document.ontouchmove = null,
			$(".probability").hasClass("active") && ($(".probability").removeClass("active"));
		});
	});
}($)