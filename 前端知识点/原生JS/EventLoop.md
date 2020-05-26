我只记录下了我认为重要的部分，原文链接：https://juejin.im/post/5ec73026f265da76da29cb25

# 简单的定义

EventLoop是浏览器渲染引擎中的事件循环线程实现的，旨在解决JS单线程会造成后面代码阻塞的问题

  ## 微任务队列

    Promise.then MutationObserver Process.nextTick async/await

  ## 宏任务队列

    setTimeout setImmediate setInterval

# 流程

1.事件执行本身就是一个宏任务，所以会在任务队列中的宏任务队列中执行JS脚本
2.执行完同步代码后，优先清空微任务队列，如果微任务队列中还有微任务存在，那么就会在下一次事件循环的时候清空
3.清空微任务队列后，清空宏任务队列
4.本轮EventLoop结束后，就会进入渲染阶段判断是否需要渲染，为什么要判断？因为会被以下几个因素影响：

    1.屏幕帧率。如果页面性能太差，那么浏览器会为了不丢帧从而降低帧率
    2.浏览器判断本次更新渲染是否会造成视觉上的变化，比如屏幕背景色的变化
    3.map of animation frame callbacks(动画帧的回调函数)是否为空

5.如果上述的判断是需要渲染的，那么就会对需要渲染的文档执行对应的回调：

    1.对需要渲染的文档：
      1.1如果窗口发生了变化，就会调用resize事件
      1.2如果页面发生了滚动，就会调用scroll事件
      1.3执行requestAnimationFrame的回调
    2.调用IntersectionObserver的回调，重新渲染用户的页面
    3.查看task队列和microTask是否还存在未清空的任务，如果队列已经为空，那么会调用Idle空闲周期算法，判断是否需要执行requestIdleCallback的回调

# requestAnimationFrame

  ## 执行时机

    动画总是会修改DOM，所以要在浏览器渲染前执行动画的回调，如果是渲染后的话，就会被推入下一次的EventLoop中，产生的延迟体验极差

  ## 优点

    如果将setTimeout的时间间隔设置的很小，那么可能会因为屏幕帧率而不会重绘，而requestAnimationFrame则不会

# requestIdleCallback

  ## 执行时机 && 作用

    渲染之后执行，计算量大但不紧急的事件可以放到这里面来做，当浏览器处于空闲状态的时候会执行里面的回调，可以传入timeout参数强制多少秒后执行，但会阻碍优先级更高的任务执行，从而造成阻塞，所以慎用

    说个题外话，React的时间分片渲染就想使用这个API，因为兼容问题只好自己在postMessage里实现了一套

# resize和scroll其实自带节流

    所以不要在解释防抖和节流场景的时候说这个场景啦~