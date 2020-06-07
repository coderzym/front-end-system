六、如何让a == 1 && a == 2 && a == 3为true？

解题思路：a == 1会进行隐式类型转换
1.使用代理
let i = 1;
let a = new Proxy({}, {
    i: 1,
    get: function () {
        return () => this.i++
    }
})
2.数组的toString方法默认会使用数组的join方法
let a = [1,2,3]
a.join = a.shift
3.通过部署Symbol.toPrimitive
let a = {
    [Symbol.toPrimitive]: (function (hint) {
        let i = 1;
        return function () {
            return i++
        }
    }())
}
console.log(a == 1 && a == 2 && a == 3);

八、异步加载JS脚本的方式有哪些？defer和async区别？

可以通过defer、async、动态创建script标签（添加到页面中才会下载）和ajax请求js脚本
defer和async区别？
1.defer是等待整个页面DOM加载完毕后，window.onload之前执行，当页面中有多个defer时，按照排列顺序执行
2.async是异步加载，一旦加载完毕后就会立即执行，会阻碍页面渲染，执行完毕后会继续渲染，当页面中有多个async时
无法确定先后顺序

十、隐藏页面中的某个元素的方法有哪些？

1.display: none
2.visibility: hidden
3.position移出屏幕
4.opacity: 0
5.宽高、字体大小为0
6.z-index
7.<div hidden></div> 
8.transform: scale(0), transform: routeY(90deg)
9.宽高为0, overflow: hidden

十二、说一说你对JS执行上下文栈和作用域链的理解？

作用域是指申明的变量和函数起作用的代码块，当内部代码块执行时会一层层的向外找寻找所需的变量，这就形成了作用域链执行上下文栈遵循后进先出的规则，用于储存代码执行时的所有上下文，首次运行时会创建一个全局的执行期上下文并push入栈，每当函数调用时就会将新的上下文push进来，每当函数执行完毕后就会被pop出栈

十四、参数按值传递几种方式？

按值传递，按引用传递，按共享传递。当参数为基本数据类型时，采用的是值传递，当参数为复杂数据类型时，采用的是按共享传递，也就是重新拷贝了一份数据，由于性能原因，当传入的参数是一个对象时，直接修改整个对象，那么采用的就是按共享传递，它的操作不会影响到外部的变量，而更改对象中的属性时，则采用的是引用传递，这样也可以理解，毕竟如果传入的对象是一个太过复杂的数据，那么还是按共享传递比较合理

十七、可迭代对象有哪些特点？
1.具有Symbol.iterator接口
2.能够使用for...of进行循环
3.能被Array.from转换成数组

十八、什么是跨域？解决跨域的方式有哪些？优缺点分别是什么？

2.CORS：实现CORS通信的关键是服务器

优点：POST和GET请求都可以使用，使用起来更方便
缺点：兼容性比JSONP略差
创建方式：在响应头中设置字段：Access-Control-Allow-Origin为*即可
又分为两种请求方式，一种是简单请求，一种是非简单请求
简单请求的构成条件：
1.请求方式为以下三种之一：HEAD GET POST
2.HTTP的头信息不超出以下几种字段：
Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type
处理简单请求的方式：浏览器会自动在请求头上添加一个Origin字段，注意的是，如果要发送cookie和http认证信息，那么ajax也得开启
withCredentials属性，且Access-Control-Allow-Origin得指定与请求网页一致的域名（cookie也遵循跨域）
处理非简单请求：会在发送HTTP请求前发送一次预检请求，服务器同意后才会正式发送HTTP请求，而且在接下来Access-Control-Max-Age
设置的时间段中不再发送预检请求

7.nginx代理跨域，因为服务器之间不存在同源策略，所以可使用nginx当做中介

9.利用webpack-dev-server

十九、JS代码执行过程？

1.根据词法分析和语法分析，将JS代码转化成AST抽象语法树

2.将AST转化为字节码，之所以不直接转化成字节码是为了减少内存压力

3.由解释器逐行解释字节码，如果发现某一段代码重复出现，那么就会标记为热点代码，并将其编译成机器码保存起来，这样就可以提高效率，所以JS代码运行的越久，效率越高