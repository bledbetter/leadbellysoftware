var LeadbellySoftUtil = Class.create({
});

// Client Detection
// See http://www.zytrax.com/tech/web/browser_ids.htm
// for complete list of user agent strings

LeadbellySoftUtil.isIE = function() {
	return navigator.userAgent.toLowerCase().indexOf("msie") >= 0 && document.all;
}

LeadbellySoftUtil.isFirefox = function() {
	return navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;
}

LeadbellySoftUtil.isSafari = function() {
	return !LeadbellySoftUtil.isChrome() && navigator.userAgent.toLowerCase().indexOf("safari") >= 0;
}

LeadbellySoftUtil.isChrome = function() {
	return navigator.userAgent.toLowerCase().indexOf("chrome") >= 0;
}

LeadbellySoftUtil.browserVersion = function() {
	var regExp = null;
	
	if(LeadbellySoftUtil.isIE()){
		regExp = /MSIE (\d*\.\d*)/i;
	} else if (LeadbellySoftUtil.isFirefox()) {
		regExp = /Firefox\/(\d*\.\d*)/i;
	} else if (LeadbellySoftUtil.isSafari()){
		regExp = /Safari\/(\d*\.\d*)/i;
	} else if (LeadbellySoftUtil.isChrome()){
		regExp = /Chrome\/(\d*\.\d*)/i;
	} else {
		return 0.0;
	}
	
	return navigator.userAgent.match(regExp)[1];
}

LeadbellySoftUtil.browserMajorVersion = function() {
	return parseInt(LeadbellySoftUtil.browserVersion());
}

//Utility method to set png src, to deal with IE bug
LeadbellySoftUtil.setImgPngSrc = function (elem, src, dummySrc){
	elem = $(elem);
	
	if (!LeadbellySoftUtil.isIE() || LeadbellySoftUtil.browserMajorVersion() >= 8)
		elem.src = src;
	else {
		elem.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='scale')";
		elem.src = dummySrc;
	}
}

LeadbellySoftUtil.writeImgPng = function (src, dimensions, dummySrc){
	if(dummySrc == null)
		dummySrc = "images/dummy_1x1.gif";
	var imgStr = '<img src="';
	if (!LeadbellySoftUtil.isIE() || LeadbellySoftUtil.browserMajorVersion() >= 8)
		imgStr += src + '"';
	else {
		imgStr += dummySrc + '" style="height:' + dimensions.h + 'px;width:' +  dimensions.w + 'px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + src + '\',sizingMethod=\'scale\');"';
	}
	
	imgStr += ">";
	document.write(imgStr);
}
