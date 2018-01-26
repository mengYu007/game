! function (){
	var head = 	document.getElementsByTagName("head")[0];
	var link = document.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("href","../component/redpack/fuli.css");
	head.appendChild(link);
	var flypack = document.createElement("a");
	flypack.setAttribute("id","flypack");
	flypack.setAttribute("style","display:none");
	flypack.setAttribute("class","flypack");
	flypack.setAttribute("href","http://lucky.upush.cn/interactionMedia/games/100001/index.html");
	document.body.appendChild(flypack);
	$("#flypack").load("../component/redpack/fuli.html",function(){
		
	});
}($)