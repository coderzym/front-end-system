class Promise {
    constructor(executor) {
        // executor必须是一个函数
        if (typeof executor !== 'function') {
            throw new Error(`${executor} is not a function`)
        }
        // 初始化参数
        this.init()
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    init() {
        this.state = 'pending'
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        this.value = null
        this.reason = null
        this.onResolvedCb = []
        this.onRejectedCb = []
    }
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'resolved'
            this.value = value
            this.onResolvedCb.forEach(fn => {
                fn(this.value)
            })
        }
    }
    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected'
            this.reason = reason
            this.onRejectedCb.forEach(fn => {
                fn(this.reason)
            })
        }
    }
    then(onResolved, onRejected) {
        if (typeof onResolved !== 'function') {
            onResolved = function (value) {
                return value
            }
        }
        if (typeof onRejected !== 'function') {
            onRejected = function (reason) {
                throw reason
            }
        }
        var promise2 = new Promise((resolve, reject) => {
            if (this.state === 'resolved') {
                let x = onResolved(this.value)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === 'rejected') {
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === 'pending') {
                this.onResolvedCb.push(() => {
                    let x = onResolved(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.onRejectedCb.push(() => {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
        })
        return promise2
    }
    static resolve(value) {
        // 如果是promise实例的话就可以直接返回调用then方法
        if (value instanceof Promise) return value
        // 否则就包装一层后promise再返回
        return new Promise(resolve => resolve(value))
    }
    static reject(reason) {
        return new Promise(reject => reject(reject))
    }
    // Promise.all方法是当所有的promise执行完成后才会改变状态，所以我们要循环遍历它
    static all(promiseArr) {
        let index = 0,
            res = []
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(
                    value => {
                        res[i] = value
                        index++
                        if (index === promiseArr.length) {
                            resolve(res)
                        }
                    },
                    reason => reject(reason)
                )
            }
        })
    }
    // 只要有一个promise状态改变就行了
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for (let k of promiseArr) {
                // 所以我们只需要直接以resolve执行，有一个状态改变了那就直接改变promiseArr的状态
                Promise.resolve(promiseArr[k]).then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        reject(reason)
                    }
                )
            }
        })
    }
    // 比如，catch((reason) => { console.log("catch: " + reason); throw "CATCH" })
    // 所以这里的cb其实就是(reason) => { console.log("catch: " + reason); throw "CATCH" }，然后不传then的
    // onResolve回调，只传个失败的
    catch(cb) {
        return this.then(null, cb)
    }
    // 最后总是要执行，也是传一个cb，它也不接收任何参数，也就代表它不在意上面的promise执行结果
    finally(cb) {
        return this.then(
            value => {
                Promise.resolve(cb()).then(() => { return value })
            },
            reason => {
                Promise.resolve(cb()).then(() => { throw reason })
            }
        )
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    let called = false
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise'))
    }
    if (x instanceof Promise) {
        x.then(
            value => {
                resolvePromise(promise2, value, resolve, reject)
            },
            reason => {
                reject(reason)
            })
    } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x,
                    resolvePromise => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, resolvePromise, resolve, reject)
                    },
                    rejectPromise => {
                        if (called) return
                        called = true
                        reject(rejectPromise)
                    })
            } else {
                if (called) return
                called = true
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}

export { Promise }