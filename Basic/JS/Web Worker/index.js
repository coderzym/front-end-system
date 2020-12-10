const w = new Worker('./message.js')
w.onmessage = function (e) {
    console.log('成功' + e.data)
}

w.postMessage('发送给你了')