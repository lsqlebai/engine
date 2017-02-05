/**
 * Created by lsq on 2017/2/5.
 */
var cls = "com/iflytek/unipay/js/UniPay";
PayComponent = {
    pay: function (order, payMode) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(cls, "pay", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    },

    payMonth: function (order, payMode) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(cls, "payMonth", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    }
};


module.exports = PayComponent;
