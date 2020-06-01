![](https://user-gold-cdn.xitu.io/2020/6/1/1726df9d9dd08de8?w=900&h=383&f=png&s=317265)

## 起因

最近终于学会了做图和排版的技巧，现在反过头去看之前写的文章，唔！**辣眼睛**，真想给自己一巴掌，之前写的是什么玩意~

但是，写都写了，总不能删了吧，只好未来会出一个系列再把之前写的内容给串起来（嗯，又是一项大工程，习惯了自己挖坑自己跳）

![](https://user-gold-cdn.xitu.io/2020/5/31/1726b0fdf4ae7727?w=320&h=330&f=png&s=50880)

之前写过一篇关于`Vue源码`的文章，但时隔一个月再看，无论是`排版`还是`对源码的理解`都不尽人意，所以这次希望能把结构写的好看点，`希望能帮助到大家`

## 从new Vue开始

我先贴一下我当前的版本号：`vue@2.6.11`，目录地址：`vue\src\core\instance\index.js`，这个文件中的代码不是很多，仅仅几行，我也都加上了注释：

![](https://user-gold-cdn.xitu.io/2020/5/31/1726b3d0d4ae4802?w=1344&h=1102&f=png&s=248002)

那么Ctrl + 左键点击下面的`initMixin(Vue)`，我们就可以看到上面`this._init(options)`的庐山真面目了，那么这里继续以注释的形式进行说明：

![](https://user-gold-cdn.xitu.io/2020/5/31/1726b56b4da0168f?w=1438&h=3006&f=png&s=645402)

到这里都挺好理解的，接下来就是要`准备进行挂载DOM`，但在挂载前需要`生成虚拟DOM`，大家应该知道为什么需要虚拟DOM，不过我这里还是写一下，以防自己以后忘记了：每个DOM元素上有非常多的属性，如果每次对DOM进行操作，那么浏览器就需要反复的操作DOM，也就相当于操作这么多的属性，丢一张图让大家感受一下，每个DOM元素的属性是`何其的恐怖如斯`

![](https://user-gold-cdn.xitu.io/2020/5/31/1726b61f65613e84?w=1920&h=646&f=png&s=52874)

而虚拟DOM只需要实现`必要的属性`即可，再配合`diff算法`，从而高效的更新页面。

回到刚才的$mount，它的目录是：`vue\src\platforms\web\runtime\index.js`

![](https://user-gold-cdn.xitu.io/2020/5/31/1726b6b80626b512?w=1156&h=504&f=png&s=108194)

## mountComponent

这个函数非常重要，它负责挂载组件：

![](https://user-gold-cdn.xitu.io/2020/6/1/1726b8406b1280af?w=1346&h=3602&f=png&s=684707)

走到这里，最重要的mount阶段就走完了，辛苦看到这里的朋友！所以我要放一波美图，让大家缓缓眼睛：

![](https://user-gold-cdn.xitu.io/2020/6/1/1726b8c682a9fffd?w=1200&h=786&f=jpeg&s=622890)

### 总结一

通过以上的内容，我们知道了几个常见面试题的答案：

- 不能在`beforeCreate`的时候发起网络请求，因为无法存入data，所以也无法双向数据绑定，但是`create`钩子可以
- 只能在`mounted`生命周期中访问DOM，因为`mountComponent函数`在`beforeMount`钩子后、`mounted`前调用
- Vue中一个组件对应一个Watcher，从Watcher代理执行`updateComponent方法`就可以看出，一个Watcher代替执行一个`updateComponent方法`

![](https://user-gold-cdn.xitu.io/2020/6/1/1726dade558de5b7?w=440&h=383&f=jpeg&s=17284)

接下来看看，Vue 2.X数据驱动视图的原理，我们得回到`initState`中`initData`的那段

![](https://user-gold-cdn.xitu.io/2020/6/1/1726d8a7ff4c72a6?w=1324&h=2072&f=png&s=403679)

接着我们就被带领到了`observe`函数中，它又会调用`Observer构造函数`，它会对传入的数值进行判断，数组特殊处理：

![](https://user-gold-cdn.xitu.io/2020/6/1/1726d8e38626bc09?w=1090&h=878&f=png&s=144428)

我们重点看`this.walk`方法吧：

![](https://user-gold-cdn.xitu.io/2020/6/1/1726d9db6fb84fa2?w=1136&h=1922&f=png&s=326857)

简化之后的代码如下：

![](https://user-gold-cdn.xitu.io/2020/6/1/1726da28fc74632d?w=1136&h=1662&f=png&s=274163)

后续另开一篇关于数据响应式处理的文章，因为有太多可以深究的点了~

### 总结二

通过上面的代码我们了解到Vue对数据的处理，**细节部分后续结合面试题来写**，这样大家应该看的会更加起劲

在new Vue后，代码执行到`initState`，接着触发`initData`，最后调用`Observer构造函数`进行数据绑定，其中会对数组进行特殊处理。通过`Object.defineProperty`递归遍历，在遍历的过程中`收集依赖`，`让渲染Watcher和当前的数据关联`，直到`所有数据被处理完毕`。这里还可以继续深究，不过上面已经说啦，后面会结合面试题一起来讲

最后给大家放一张脑图，不过不是什么大制作，**只是对这篇文章的总结**，不过会随着文章的不断深入而丰富

## 脑图放送

![](https://user-gold-cdn.xitu.io/2020/6/1/1726df3492890c6a?w=3710&h=1262&f=png&s=405329)