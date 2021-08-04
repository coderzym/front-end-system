/* CommonJS

1. 它是服务器端模块的规范，Node.js 就是采用了这个规范。但目前也可用于浏览器端，需要使用 Browserify 进行提前编译打包

2. 引入方式使用 require，暴露的方式使用 module.exports 或 exports

3. 同步加载模块

AMD

1. 异步加载模块，加载完毕后会执行回调函数

2. 可运行在浏览器和 Node 环境

3. 并行加载多个模块

CMD

1. 基于CommonJS 和 AMD 基础上提出的

2. 异步加载，有缓存

ES6 Module

1. 动态引入（按需加载），没有缓存

2. 现在浏览器和服务器均不支持 ES6 的模块化语法，所以要借助工具来编译运行

  2.1. Babel 将 ES6+ 转换为 ES5- （ES6 的模块化语法 编译成 commonjs）
  2.2. Browserify 将 CommonJS 语法编译成能让浏览器识别的语法

3. 自动使用严格模式

动态加载

import 和 export 不能写在代码块中，只能写在模块的顶层，所以可以使用 import() 函数实现动态加载，它和 Node 中的 require 很像，只不过它是异步，后者是同步

并发加载多个模块

Promise.all([import('./module1.js'), import('./module2.js'), import('./module3.js')]).then(
  ([module1, module2, module3]) => {
    // do something
  }
);

异步函数的模块导入

import() 也可以用在 async 函数之中。 */
