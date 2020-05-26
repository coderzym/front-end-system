# 背景

用户体验(页面闪烁)和性能(性能损耗)

# 实现原理

nextTick实际上是一个Vue封装的异步方法，它内部是有4个异步方法，分别是Promise.then => MutationObserver => setImmediate => setTimeout，会对这4个方法进行检测是否存在，按照优先级以及是否存在来挑选对应的异步API，挑选完之后会对传入的方法进行一系列的排序去重，生成一个队列，等页面的同步任务执行完之后就会开始清空这个队列

我们可以在Vue.config.async = false来设置同步渲染，也可以设置this._watcher.sync = true，不过官网不推荐

# 实现思路

1.先定义一个nextTick方法
2.依次将函数保存到队列中
3.压入Promise中
4.当同步任务执行完毕依次执行队列中的promise函数

# 伪代码

let pending = false,
    callbacks = []

function flushCallbacks() {
    pending = false
    for (let index = 0; index < callbacks.length; index++) {
        callbacks[index]()
    }
    callbacks.length = 0
}

function nextTick(cb) {
    callbacks.push(cb)
    if (!pending) {
        pending = true
        Promise.resolve().then(flushCallbacks)
    }
}