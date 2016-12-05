
custom = {
    getDeviceID:function () {
        return cc.SimpleNativeClass.func();
    }
};

custom = CC_JSB ? custom : require("./webCustom");

module.exports = custom;
