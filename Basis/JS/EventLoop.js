/* 异步操作包括但不局限于：

1. GUI 渲染线程
2. JS引擎线程
3. 事件触发线程
4. 定时器触发线程
5. 异步http请求线程

这些异步线程都是由浏览器实现了它们与JS引擎的通信，与JS引擎不在同一个线程。

宏任务：

  浏览器：setTimeout、setInterval、I/O(Mouse Events、Keyboard Events、Network Events)

  Node：setImmediate

微任务：

  浏览器：Promise.then、MutationObserver

  Node：process.nextTick

宏任务与微任务的优先级

同步 => 微任务 => 宏任务 */
