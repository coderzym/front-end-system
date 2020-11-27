### vue生命周期分为

beforeCreated Created beforeMount Mounted beforeUpdate Updated beforeDestroy Destroyed

### beforeCreated

进行一系列初始化行为，如`initInject`、`initState`、`initEvents`

### Created

`初始化data、methods、props、watch、computed`，在这里已经可以访问到data中的数据，但实例还未挂载

### beforeMount

`Created`之后，会把我们传入的`template/html`文本编译成`render函数`生成`VNode`，对`VNode`进行`patch`操作，`转成真实元素后渲染到DOM上`，但实例还未挂载。之后就是让`Watcher类`来代理执行这个函数，以便收集`响应式数据`。做完这些后才会执行`Mounted回调`，这也说明了为什么我们在Mounted的时候才能使用真实DOM。

如果在`render的过程`中碰到了子组件，就会优先构造子组件，`为子组件生成属于子组件的vue构造函数`，执行到`子组件的Mounted`，然后`父级再Mounted`，即使组件过多，总是`先完成内部`的Mounted，然后外部再完成，遵循先子后父

### Mounted

DOM节点挂载完毕，双向数据绑定已经完成，至此初始化生命周期结束

### beforeUpdate

当响应式数据更改的时候，调用它自己的watcher，然后进行diff算法操作，我们可以在这里更改数据，不会进行重渲染。和beforeMount有共同点，就是如果props的流向是父 => 子 => 孙，那么updated更新的时候则是孙 => 子 => 父

### updated

至此更新完毕，注意在这里更改数据的时候可能会引起死循环

### beforeDestroy

检测组件是否被卸载，如果已经卸载，那么就进行下一步；否则进行一系列清理逻辑的操作，如清除父子关系、拆卸watcher，遵循先子后父，和Mounted一样

### destroyed

至此实例销毁完毕，所有的依赖关系都已被解除

### 2.6版本后新增了一个serverPrefetch

允许我们在任何组件的渲染过程中异步等待数据