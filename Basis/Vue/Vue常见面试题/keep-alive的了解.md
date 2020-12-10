# 基本介绍

它是Vue的内置组件，可以使得被包含的组件保持状态，避免重新渲染，目前keep-alive还新增了2个属性：include要包含哪些组件缓存，exclude不含哪些组件缓存且优先级比include高

另外它还用到了LRU算法，也就是Least Recently Used算法，核心思想是如果数据被访问过，那么未来被访问的几率更高

# keep-alive为什么不会生成DOM节点？

1.在initLifeCycle时会跳过options.abstract的组件，所以不会生成DOM节点
2.重新渲染的时候可以直接跳过keep-alive的组件，避免diff算法多余的比较

# keep-alive缓存的原理

内部会对keep-alive的实例做一个检测，如果有这个实例，那么就会return true，如果没有这个实例则会插入到父元素中