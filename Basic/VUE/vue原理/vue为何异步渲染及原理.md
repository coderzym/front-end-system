考虑到DOM渲染的性能

当`响应式数据发生改变`的时候，会`调用对应的watcher上面的update`方法，而update是被压入一个异步更新队列，当JS主线程中已经没有同步任务的时候，会去这个队列中依次执行`update`方法，由于`Event Loop`机制，执行顺序还是得按照每个`update`的自身来看，优先级分别是`Promise.then` => `mutationObserver` => `setImmediate` => `setTimeout`

同时每一个watcher都会有自己的标识，过滤了重复的操作，提高了DOM渲染性能