// 接收三个参数，要发起请求的URL、请求的参数、回调函数
function jsonp({ url, params, cb }) {
    // 这里是拼接参数的方法
    let createUrl = () => {
        // 申明一个字符串
        let dataStr = ''
        // for...in循环遍历参数
        for (let k in params) {
            // 进行拼接
            dataStr += `${k}=${params[k]}&`
        }
        // 最后将回调函数也加上去
        dataStr += `callback=${cb}`
        // 返回最终的结果
        return `${url}?${dataStr}`
    }
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
        // 在页面上创建script标签
        let script = document.createElement('script')
        // 将script标签中的src属性设置为上面函数返回的参数
        script.src = createUrl()
        // 将script标签插入到body中
        document.body.appendChild(script)
        // 添加回调
        window[cb] = data => {
            // 成功的回调，会将我们要请求的参数作为参数传入
            resolve(data)
            // 执行完毕后移除script标签
            document.body.removeChild(script)
        }
    })
}