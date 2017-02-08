/**
 * Created by lsq on 2017/2/5.
 */
var cls = "com/iflytek/unipay/js/UniPay";
PayComponent = {
    pay: function (order, payMode, callback) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener(callback);
            jsb.reflection.callStaticMethod(cls, "pay", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    },

    payMonth: function (order, payMode, callback) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            PayCallback.addListener(callback);
            jsb.reflection.callStaticMethod(cls, "payMonth", "(Ljava/lang/String;Ljava/lang/String;)V", order, payMode);
            return true;
        } else {
            return false;
        }
    }
};

if (cc.sys.os == cc.sys.OS_ANDROID) {
    PayCallback = {
        listeners: [],
        addListener: function (listener) {
            this.listeners.push(listener);
        },

        onPay: function (payState) {
            for (var i = 0; i < this.listeners.length; i++) {
                this.listeners[i](payState);
            }
            this.listeners.splice(0, this.listeners.length);
        }
    };
    cc.PayListener.addListener(PayCallback, "onPay");
}


module.exports = PayComponent;
