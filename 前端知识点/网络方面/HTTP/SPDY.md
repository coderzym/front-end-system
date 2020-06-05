SPDY(也可以理解为speedy，迅速的)的设计

    在TCP/IP应用层中加了一层SPDY会话层，HTTP就可以使用以下新增的功能：
        1.TCP多路复用，通过一条TCP链接处理多个HTTP请求
        2.赋予请求优先级
        3.压缩HTTP首部
        4.推送功能
        5.服务器提示功能

websocket应运而生

    是Web和Web服务器之间的全双工通信标准，W3C也为Websocket定义了一个API，这个协议是建立在HTTP的基础上，所以发送端和服务端都可以发送请求到对端，以下是它的几个特点：

        1.推送功能
        2.减少通信量
        3.为了实现websocket通信，在第一次请求的时候配置Upgrade: websocket