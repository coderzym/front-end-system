function* a() {
    try {
        console.log(yield Promise.resolve(1))
        console.log(yield 2) //2
        console.log(yield Promise.reject('error'))
    } catch (error) {
        console.log(error)
    }
}

function createGen(fn) {
    return function () {
        var self = this,
            res,
            g = fn.apply(self, arguments)
        return new Promise((resolve, reject) => {
            function _next(val) {
                // 因为是Promise的实例，所以我们要做一层try...catch的包裹
                try {
                    // 拿到next执行后返回的对象，里面有done和value两个属性
                    res = g.next(val)
                } catch (error) {
                    reject(error)
                }
                // 如果迭代完成，那么就结束，也就是我们上面说的递归出口
                if (res.done) return resolve(res.value)
                // 为了防止res.value是一个原始值，我们用Promise包装一下，然后用then方法处理，成功了
                // 就继续调用_next方法去递归，直到res.done等于false
                Promise.resolve(res.value).then(
                    v => _next(v),
                    r => g.throw(r)
                )
            }
            _next()
        })
    }
}
createGen(a)