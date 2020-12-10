1. 生成Vue实例

2. 调用 `init方法` 初始化Vue实例，初始化生命周期、初始化事件中心、初始化渲染，然后调用`beforeCreate`方法，这个时候无法访问data和Dom，紧接着初始化data、初始化methods、初始化computed、初始化watch、初始化props，然后调用`created`方法，这个时候可以访问data数据，但无法访问Dom

3. 在这个时候初始化已经完毕，接下来会调用`$mount`方法对Vue实例进行挂载，这个过程又分为三个步骤，模板编译、渲染和更新

  1. 首先会调用`parse方法`(实际上是大量的正则表达式)，截取模板字符串生成AST(JS对象)
  2. 然后会调用`optimize方法`对AST进行静态标记，优化diff算法
  3. 最后会调用`generate方法`将AST树转换成`render function`

4. 拿到`render function`后，会调用$mount中的`mountComponent`方法，这个时候会先执行`beforeMount`，然后`实例化一个Watcher`，在它的回调中调用`updateComponent`方法，此方法会调用render方法将`render function`渲染成`虚拟DOM`

5. 拿到虚拟DOM后，调用`update方法`，update方法又会调用`patch方法`将虚拟DOM转换成真实DOM，最终调用update方法更新DOM

这里可以把模板编译说的更详细点：

  1. 将我们传入的模板字符串通过正则表达式截取出来，每截取一段就会维护一个stack来记录DOM的层级关系，紧接着解析被截取的字符串，最后形成一个AST(JS对象)
    
  2. 为了优化虚拟DOM的性能，在截取字符串的时候通过设置static属性标记静态节点，这是一个递归AST的过程，静态节点分为静态节点和静态根节点，静态根节点的children如果有一项不是静态节点，那么它就不是静态节点，主要分为三种情况：
        
      1. 元素节点
      2. 带变量的文本节点
      3. 纯文本节点
    
    按情况进行标记
    
  3. 最后就是将标记过静态节点的AST转化成render函数，render函数由三部分组成
        
      1. HTML标签名
      2. HTML标签属性，可选项
      3. children
    
    遇到children就继续递归遍历，直到当前的AST被遍历完，最终形成一个完整的render函数，然后通过createElement生成一个VNode(实际上是一个创建了一个节点描述，告诉vue页面需要渲染出一个什么样的节点)，注意，只有在渲染函数执行的时候，才会对数据进行访问，而且会由Watcher代理执行render函数，这样就可以收集到每个组件的响应式数据