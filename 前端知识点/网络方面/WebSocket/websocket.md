# 为什么出现？

在websocket出现之前，服务器无法主动给客户端推送消息，除非客户端使用轮询的方式(长轮询和短轮询)，只需要在请求头中加上`Upgrade：websocket`字段即可

# 兼容性问题

08年的时候就已经出现，所以现在早已普及

# 有哪些特别？

1. 基于TCP协议的双工协议，握手阶段采用 HTTP 协议
2. ping/pong机制，用来判断是否断开链接，如果断开，则可以释放服务器资源
3. `没有同源限制`
4. 协议头为`ws`，加密为`wss`，相信科学上网的小伙伴们应该很熟悉这个东西

# 使用方法？

1. 实例化Websocket对象

```javascript
let socket = new Websocket(url)
```

2. 发送请求

```javascript
socket.onopen = function (event) {
    socket.send("我想和你链接")
}
```

3. 收到数据后

```javascript
socket.onmessage = function (event) {
    console.log(`已经成功拿到数据${event}`)
}
```

4. 关闭

```javascript
socket.close()

socket.onclose = function (event) {
    console.log("关闭")
}
```

# 状态码

1. CONNECTING：值为0，表示正在链接
2. OPEN：值为1，表示连接成功，可以通信
3. CLOSING：值为2，表示正在关闭链接
4. CLOSED：值为3，表示连接已经关闭，或者打开连接失败

# 如果服务端传送的是二进制数据呢？

为了防止这种情况，所以我们得做一个判断，在接收到服务器数据的时候：

```javascript
socket.onmessage = function (event) {
    if (typeof event.data === String) {
        // do something
    } 

    if (event.data instanceof ArrayBuffer) {
        // do something
    }
}
```