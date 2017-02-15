
custom = {
    getDeviceID:function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return jsb.reflection.callStaticMethod("com/cmcc/system/Param", "getMacAddress", "()Ljava/lang/String;");
        } else {
			return cc.SimpleNativeClass.testLog();
            //return "135";
        }
    }
};

custom = CC_JSB ? custom : require("./webCustom");

module.exports = custom;
