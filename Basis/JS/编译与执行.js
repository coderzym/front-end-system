/* JS的编译阶段分为，

  1. 词法分析 
  2. 语法分析 
  3. 代码生成

在这里我们只着重的讲作用域、作用域链，作用域分为，
  
  1. 词法作用域
  2. 函数作用域
  3. 块作用域

词法作用域又称静态作用域，抛去 eval、with 等情况外，JS作用域在我们写下代码的时候就已经确定了。而在函数作用域中，只要你不 return 内部的变量出来，外部就无法访问。

最后就是块作用域了，在ES6之前是没有块作用域这个概念的，变量也都用 var 申明，而在ES6中新增了 {} const let 用来生成块作用域。

以往我们用 var 声明变量但不赋值，访问的时候都还可以得到undefined，但是现在用 const let 声明的变量之前就访问，就会报错，这也就是暂时性死区。下面是最直观的例子，

function foo() {
  var bar = 1;
  {
    let bar = 2;
  }

  console.log(bar);
}

function zoo() {
  var bar = 1;
  {
    var bar = 2;
  }

  console.log(bar);
}

foo(); // 1
zoo(); // 2

而你想要变量受到保护，那么就用 const 关键字。以上的内容都是编译阶段，诸如声明提升的知识点并没有提到。接下来开始讲执行阶段。

首先是执行上下文栈。当函数执行时就会创建执行上下文栈，它有三种类型：

  1. 全局执行上下文。它做了两件事情，创建一个全局对象和将this指向这个全局对象，如果是在浏览器环境下，则全局对象就是Window对象。一个程序中只会存在一个全局执行上下文和全局对象。
  2. 函数执行上下文。每次调用函数的时候，就会创建它，不调用的话，则不会创建。每个函数都有自己的执行上下文。
  3. Eval执行上下文。懒得讨论它。

每种类型的执行上下文都有三个阶段，

  1. 创建变量对象：初始化一系列参数，比如 arguments 形参列表，ES6中已被(...args)代替，接着提升函数、变量(var关键字)等声明。

    VO = {
      Arguments: {}, // 实参
      Param_Variable: 具体值, //形参
      Function: <function reference>, // 函数的引用
      Variable: undefined // 其他变量
    }

    AO(活动的变量对象，也就是执行的时候) = {
      Arguments: {}, // 实参
      Param_Variable: 具体值, // 形参
      Function: <function reference>, // 函数的引用
      Variable: 具体值 // 注意，这里已经赋值了喔
    }

  2. 创建作用域链：作用域链由多个变量对象组成。当函数执行时，它先从自己的作用域链上查找相关变量，如果没有找到，就会去外层的作用域链上，直到全局作用域链。所以遵循层层向外查找的规律。

  3. 确定this对象的指向。

作用域链可以理解为下面这种伪代码格式，

{
  Scope: 
  [
    { // 当前作用域对应的VO
      实参,
      形参,
      变量,
      函数
    }, 
    { // 第二个作用域对应的VO
      实参,
      形参,
      变量,
      函数
    },
    ... 
    { // 全局作用域对应的VO
      变量,
      函数
    }
  ]
}

最后来谈谈 this 。它有四种绑定规则，

  1. 默认绑定
  2. 隐式绑定
  3. 显式绑定
  4. new操作符

先来看看默认绑定，一句话概括就是，函数 this 指向它的调用者，看个例子：

function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2

如果在严格模式下，就会报错，因为全局的 this 指向 undefined

再来看看隐式绑定。它和显示绑定不同的是，它可能会存在其他的上下文对象，所以我们需要搞清楚执行上下文栈，举个例子分析下，*/

function foo() {
  console.log(this.a);
}
const container = {
  a: 2,
  foo: foo,
};
container.foo(); // 2

/* 这段代码转换成执行上下文栈就是这个样子：

{
  Scope: 
  [
    { // 当前作用域对应的VO
      a = 2,
      foo = function foo() {},
      this => container
    },
    { // 全局作用域对应的VO
      function foo() {},
      container对象,
      this => window
    }
  ]
}

再来换一个代码块, */

function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo,
};
var obj1 = {
  a: 2,
  obj2: obj2,
};
obj1.obj2.foo(); // 42

/* 这段代码转换成执行上下文栈就是这个样子：

{
  Scope:
  [
    { // foo函数作用域对应的AO
      this => obj2
    },
    { // obj2块作用域对应的AO
      a = 42,
      foo = function foo() {},
      this => obj2
    },
    { // obj1块作用域对应的AO
      a = 2,
      obj2 = obj2对象,
      this => obj1
    },
    { // 全局作用域对应的VO
      function foo() {},
      obj1对象,
      obj2对象,
      this => window
    }
  ]
}

当函数执行的时候，就会把在作用域链上找 this，结果就是 obj2 。再来看看隐式丢失， */

function foo() {
  console.log(this.a);
}
const container = {
  a: 2,
  foo: foo,
};
const bar = container.foo;
const a = "Hello world!";
bar(); // "Hello world!"

/* 执行上下文栈 => 

{
  Scope: 
  [
    { // bar函数的AO
      this => window
    },
    { // 全局VO
      function foo() {},
      container对象，
      bar = function foo() {},
      a = "Hello world!",
      this => window
    }
  ]
}

显式绑定就是 call apply bind。

func1.call(obj, param1, param2, param3)
func1.apply(obj, [param1, param2, param3])
func1.bind(obj, param1, param2, param3) 不会立即返回结果，需要再执行一次，可以理解为返回的是一个闭包

new 操作符。将 this 指向当前的构造函数。 

this优先级：new > 显示绑定 > 隐式绑定 > 默认绑定

箭头函数没有自己的this，只继承第一个非箭头函数的this */
