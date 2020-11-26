### 由哪几部分组成

1. state: 定义了应用程序的数据，可以设置默认的初始状态

2. getters：允许组件从`store`中获取数据

3. mutations：是唯一更改`store`中状态的方法，且必须是同步函数。但不可以直接调用`mutation`，必须使用`commit`函数来告诉`Vuex`更新存储并提交更改

4. actions：执行异步操作来存取状态，但也不可以直接调用`action`，必须使用`dispatch函数`来执行

### 单例模式

在`beforeCreate`的时候，通过`Vue.mixin`给每个Vue实例上都添加了同一个Store实例，所以都可以共用同一个`$store`，再具体点就是检测当前组件是否为根组件，如果是，那么就从传入的`options.store`列表里取值，如果不是，那么就找到当前组件的父组件，然后从它里面取store