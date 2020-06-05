# Event构造函数

    语法：任何元素中都可以使用dispatch进行调用，第一个参数是事件名称，第二个参数是修饰符，cancelable：是否取消；bubbles：是否冒泡

    1.先自定义一个事件
    let newEvent = new Event('loveXX', {cancelable: false, bubbles: true})
    2.派发事件
    document.dispatchEvent(myEvent)
    3.通过addEventListener调用

# CustomEvent构造函数

    语法：和Event构造函数一样，但它多了一个detail对象，这个对象里面传入要传递的参数

    let newEvent = new CustomEvent('loveXX', detail: {形式为键值对的参数}, {cancelable: false, bubbles: true})

    想拿到这个参数也很容易，使用e.detail.键名即可

# 场景

个人觉得这个东西可理解为观察者模式，主页面派发这个事件，其他页面监听这个事件，当这个事件被派发了之后，然后做出相应的回调