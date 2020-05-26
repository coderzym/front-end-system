// 1.拼接url形成请求参数

function jsonp({ url, params, cb }) {
    let createUrl = () => {
        let dataStr = ''
        for (let k in params) {
            dataStr += `${k}=${params[k]}&`
        }
        dataStr += `callback=${cb}`
        return `${url}?${dataStr}`
    }
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        script.src = createUrl()
        document.body.appendChild(script)
        // 添加回调
        window[cb] = data => {
            resolve(data)
            document.body.removeChild(script)
        }
    })
}