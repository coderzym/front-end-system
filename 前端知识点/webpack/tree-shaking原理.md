tree-shaking建立在ES6 Module的基础上，因为ES6 Module的依赖关系在编写时就已经决定的。因为像commonJS这样的规范，是要等到代码执行之后才能确定依赖关系，这就不能做静态分析去优化，但是ES6 Module可以

为什么有些时候tree-shaking不起作用？

    主要是代码有副作用。副作用的意思就是一个函数会对外部的变量产生影响，babel会将本来没有副作用的ES6/ES7代码，编译成ES5，也就有了副作用，所以tree-shaking会失效

如何配置？

    1.先将package.json中将sideEffects设置为false，表示没有文件有副作用，可以全部使用Tree-shaking
    2.接着把webpack.config.js文件中设置css文件sideEffects为false
    3.最后设置babel中的{module: false}

对于IIFE来讲，如果没有使用的话，依然会被Tree-shaking干掉