首先要明确一点，虚拟dom不一定比直接操作真实DOM要快，因为我们在更新真实DOM前，总要更新虚拟DOM，而虚拟DOM的好处是

   1. 可以劫持我们重复修改DOM的操作，避免过多的重复渲染
   2. 对于一些大型的列表，由于我们存在虚拟DOM这样的一层缓冲，提高没改变的元素复用率
   3. 真实的DOM中每一个节点的属性非常多，而虚拟DOM中的虚拟节点只需要实现一些必要的属性

然后是diff算法，在Vue中，diff算法遵循同级比较。在初始化生命周期的时候会创建两套VNode，在页面进行更新的时候会将其中一套赋值为新的VNode，首先利用key值判断是否有对比的必要，如果key值不同，会直接替换，如果有对比的必要，会采用双端比较法，四种匹配方式去匹配相同的节点，如果没有匹配到，那么就使用key值去匹配

所以key的存在提高了节点的复用性以及对比VNode的效率