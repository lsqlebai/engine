/**
 * Created by sulei on 2017/2/15.
 */

UnifySocket = cc.Class({
    _dstIP : null, // 目标ip
    _dstPort : 0, // 目标port
    _proxyIP : null, // 代理ip
    _proxyPort : 0, // 代理port
    _service : null, // 接口service，用于websocket，例如ws://111.1.1.1:343/testService中的testService

    _urlWebSocket : null, // websocket的url，根据ip、端口、service拼接而成

    _socket : null, // socket，根据平台进行生成，如果是web平台，则使用WebSocket，否则使用AsioSocket

    /**
     *
     * @param dstIP
     * @param dstPort
     * @param service
     * @param proxyIP
     * @param proxyPort
     */
    ctor: function (dstIP, dstPort, service, proxyIP, proxyPort) {
        


        this._dstIP = dstIP;
        this._dstPort = dstPort;
        this._service = service;
        this._proxyIP = proxyIP;
        this._proxyPort = proxyPort;

        if (cc.sys.isNative) // native，使用asio
        {
            this._socket = new AsioConnection(); // 创建asio socket

            if(this._proxyIP && this._proxyPort)
            {
                this._socket.setProxy(this._proxyIP, this._proxyPort); // 设置代理
            }
            this._socket.setEnableCrypt(true); // 开启加密
            this._socket.asynConnect(this._dstIP, this._dstPort); // 开始连接



        }
        else // web，使用websocket
        {
            if(this._service && !this._service.empty())
            {
                this._urlWebSocket = "ws://"+this._dstIP+":"+this._dstPort+"/"+this._service;
            }
            else
            {
                this._urlWebSocket = "ws://"+this._dstIP+":"+this._dstPort;
            }

            this._socket = new WebSocket(this._urlWebSocket); // 创建websocket
        }

        this._registerHandler();
    },

    send : function (data)
    {
        if (cc.sys.isNative) // native，使用asio
        {
            this._socket.asynSend(data, -1);

        }else
        {
            this._socket.send(data);
        }
    },

	close : function ()
    {
        if (cc.sys.isNative) // native，使用asio
        {
            this._socket.disconnect();

        }else
        {
            this._socket.close();
        }
    },
	
    _registerHandler : function()
    {
        var self = this;
        if (cc.sys.isNative)
        {
            this._socket.onConnectResult = function(event)
            {
                if(event.errorCode===0) // 连接成功
                {
                    self.onopen(event);
                }

            };

            this._socket.onDisconnect = function(event)
            {
                if(event.isBySelf)
                {
                    self.onclose(event);
                }else
                {
                    self.onerror(event);
                }
            };

            this._socket.onMessage = function(event)
            {
                self.onmessage(event);
            };

        }
        else
        {
            this._socket.onopen = function(event)
            {
                self.onopen(event);
            };

            this._socket.onmessage = function(event)
            {
                self.onmessage(event);
            };
            this._socket.onerror = function(event)
            {
                self.onerror(event);
            };
            this._socket.onclose = function(event)
            {
                self.onerror(event);
            };
        }
    },

onmessage : function (event) {},
onerror :function(event) {},
onopen :function(event) {},
onclose :function(event) {},
});

module.exports = UnifySocket;
