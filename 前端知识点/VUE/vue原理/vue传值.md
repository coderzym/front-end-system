# 父子之间

    props/$emit

# 兄弟间

    eventBus，也就是$on/$emit，$on中是事件名+回调，$emit是事件名+要传的数据

# 跨层级

## $attrs

    在父组件中引入，然后绑定v-bind='$attrs'，在子组件中可通过$attrs进行访问，通常配合inheritAttrs。也可以将父组件中的data绑定到子组件上，然后在子组件内部使用$attrs依然可以访问到

## $listeners

    和$attrs类似，只不过使用的是v-on='$listeners'

## provide/inject

    无论层级有多深，都可以直接访问到，不推荐使用，会导致数据流混乱

# $parent/$children 

    获取父子组件实例

# ref

    如果用在组件上，那么获取的就是组件实例，如果用在DOM上，那么获取的就是DOM对象