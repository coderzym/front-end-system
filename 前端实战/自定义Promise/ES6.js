class Promise {
    constructor(executor) {
        // executor必须是一个函数
        if (typeof executor !== 'function') {
            throw new Error(`${executor} is not a function`)
        }
        // 初始化参数
        this.init()
        // 为了防止Promise执行出错，所以我们要将它放在try...catch里面
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    // 每次使用Promise时需要初始化里面所有的状态、回调数组以及结果值(成功的是value，失败的是reason)
    init() {
        this.state = 'pending'
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        this.value = null
        this.reason = null
        this.onResolvedCb = []
        this.onRejectedCb = []
    }
    // resolve方法会清空onResolvedCb队列
    resolve(value) {
        if (this.state === 'pending') {
            this.state = 'resolved'
            this.value = value
            this.onResolvedCb.forEach(fn => {
                fn(this.value)
            })
        }
    }
    // reject方法会清空onRejectedCb队列
    reject(reason) {
        if (this.state === 'pending') {
            this.state = 'rejected'
            this.reason = reason
            this.onRejectedCb.forEach(fn => {
                fn(this.reason)
            })
        }
    }
    // then方法会传入成功的回调和失败的回调
    then(onResolved, onRejected) {
        // 如果传入的不是方法，那么返回这个原始值
        if (typeof onResolved !== 'function') {
            onResolved = function (value) {
                return value
            }
        }
        // 这里和上面的一致
        if (typeof onRejected !== 'function') {
            onRejected = function (reason) {
                throw reason
            }
        }
        // 根据Promise A+的规范里讲的，如果then的返回值依然是一个Promise对象，那么得分情况进行处理
        // 这个过程可以理解为Promise的解决过程，它需要4个参数：
        // 1.当前返回的Promise对象 2.被解决的值 3.成功的回调 4.失败的回调
        // 规范上说：
        //     如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
        //     如果 x 处于执行态，用相同的值执行 promise
        //     如果 x 处于拒绝态，用相同的据因拒绝 promise
        var promise2 = new Promise((resolve, reject) => {
            if (this.state === 'resolved') {
                // 所以这里需要传入当前的值给Promise
                let x = onResolved(this.value)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === 'rejected') {
                // 同上
                let x = onRejected(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.state === 'pending') {
                // 如果为等待态，那么得继续保持等待，所以传入回调数组中，等待下一次执行
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
    // 所以这里的cb其实就是(reason) => { console.log("catch: " + reason); throw "CATCH" }，
    // 然后不传then的onResolve回调，只传个失败的
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
// 这里接上对Promise的处理，大家可以看看：
// x 为对象或函数
// 如果 x 为对象或者函数：
//     把 x.then 赋值给 then
//     如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
//     如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数：
//         1.第一个参数叫做 resolvePromise 
//         2.第二个参数叫做 rejectPromise:
//              如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
//              如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
//           如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，
//           则优先采用首次调用并忽略剩下的调用;
//           如果调用 then 方法抛出了异常 e：
//           如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
//           否则以 e 为据因拒绝 promise
//         如果 then 不是函数，以 x 为参数执行 promise
//     如果 x 不为对象或者函数，以 x 为参数执行 promise
function resolvePromise(promise2, x, resolve, reject) {
    // promise2：当前返回的Promise实例
    // x：结果值
    // 后面2个是成功与失败的回调
    // 设置called开关
    let called = false
    // 如何Promise实例等于了这个结果值，那必须得退出，否则会进入死循环
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle detected for promise'))
    }
    // 如果结果值是Promise的实例
    if (x instanceof Promise) {
        x.then(
            value => {
                // 成功的回调中继续使用递归
                resolvePromise(promise2, value, resolve, reject)
            },
            reason => {
                // 失败的话，那就失败咯
                reject(reason)
            })
    // 如果结果值为对象和函数并且它不为null
    } else if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
        // 那么就在try...catch中执行
        try {
            // 将then方法拿出来
            let then = x.then
            // 如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数
            if (typeof then === 'function') {
                then.call(x,
                    resolvePromise => {
                        // 记住规范中说的：优先采用首次调用并忽略剩下的调用，
                        // 所以我们最开始设置了called开关
                        if (called) return
                        called = true
                        resolvePromise(promise2, resolvePromise, resolve, reject)
                    },
                    rejectPromise => {
                        // 同上
                        if (called) return
                        called = true
                        reject(rejectPromise)
                    })
            } else {
                // 如果 then 不是函数，以 x 为参数执行 promise
                if (called) return
                called = true
                resolve(x)
            }
            // 否则以 e 为据因拒绝 promise
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    } else {
        resolve(x)
    }
}

export { Promise }