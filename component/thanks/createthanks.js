! function (){
	var thanks = document.createElement("div");
	thanks.setAttribute("id","thanks");
	thanks.setAttribute("style","display:none");
	thanks.setAttribute("class","db-msg-modal");
	document.body.appendChild(thanks);
	$("#thanks").load("../component/thanks/thanks.html",function(){
		$(".db-msg-modal").off("click").on("click", ".msg-modal-close",function() {
			$(".db-msg-modal").hide();
		    $("#db-content").removeClass("filter");
		    reset();
		}).on("click", ".msg-btn",function() {
			$(".db-msg-modal").hide();
		    $("#db-content").removeClass("filter");
		    reset();
		});
	});
}($)