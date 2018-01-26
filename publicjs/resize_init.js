(function(doc, win) {
	var document = doc.documentElement,
		nav = navigator.userAgent.match(/iphone|ipod|ipad/gi),
		devicePR = nav ? Math.min(win.devicePixelRatio, 3) : 1,
		resize = "orientationchange" in window ? "orientationchange" : "resize";
	document.dataset.dpr = devicePR;
	for (var d, l, c = !1, o = doc.getElementsByTagName("meta"), r = 0; r < o.length; r++) l = o[r], "viewport" == l.name && (c = !0, d = l);
	if (c) d.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no";
	else {
		var o = doc.createElement("meta");
		o.name = "viewport", o.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no", document.firstElementChild.appendChild(o)
	}
	var recalc = function() {
			var width = document.clientWidth;
			var height = document.clientHeight;
			width / devicePR > 640 && (width = 640 * devicePR);
			height / devicePR > 640 && (height = 640 * devicePR);
			var result = height < width ? height : width;
			window.remScale = result / 640;
			document.style.fontSize = 200 * (result / 640) + "px";
		};
	recalc(), doc.addEventListener && win.addEventListener(resize, recalc, !1)
})(document, window);