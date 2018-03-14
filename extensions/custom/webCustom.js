var key = "musicNB_device";

function setCookie(name, value) {
	
	if(document && document.cookie)
	{
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() +  365 * 24 * 60 * 60 * 1000);//过期时间 1年
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();	
	}else{
		cc.sys.localStorage.setItem(name, value);
	}
    
}

function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
	
	if(document && document.cookie)
	{
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}	
	}else{
		return cc.sys.localStorage.getItem(key);
	}
    
    return null;
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};


var custom = {
    getDeviceID:function () {
        var id = getCookie(key);
        if (id == null || id.length==0) {
            id = generateUUID();
            setCookie(key, id);
        }
        return id;
    }
};


module.exports = custom;
