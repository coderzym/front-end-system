addEventListener('message', function (e) {
    console.log(e.data);
    postMessage('已经收到你发送的消息')
})