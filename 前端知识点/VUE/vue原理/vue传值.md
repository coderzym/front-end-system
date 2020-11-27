### 父子之间

    props/$emit

### 兄弟间

1. eventBus，也就是$on/$emit，$on中是事件名+回调，$emit是事件名+要传的数据
    
2. 也可以通过查找父组件中的子组件实现，也就是 `this.$parent.$children`，在 `$children` 中可以通过组件 `name` 查询到需要的组件实例，然后进行通信。

### 跨层级

1. $attrs。在父组件中引入，然后绑定v-bind='$attrs'，在子组件中可通过$attrs进行访问，通常配合`inheritAttrs`。也可以将父组件中的data绑定到子组件上，然后在子组件内部使用$attrs依然可以访问到，下面先对`inheritAttrs`打个比方：

<!-- 父组件 -->
<template>
　<div class="parent">
    <child-component aaa="1111"></child-component>
  </div>
</template>

<script>
import ChildComponent from './child-component'
export default {
  components: {
    ChildComponent
  }
}
</script>

<!-- 子组件 -->
<template>
  <div class="child" v-bind="$attrs">子组件</div>
</template>

<script>
export default {
  inheritAttrs: true,
  mounted() {
    console.log('this.$attrs', this.$attrs) // { aaa: 1111 }
  }
}
</script>

结论：

   1. 子组件中的`inheritAttrs`值为`true`，那么子组件的根元素会渲染父组件传过来的值，反之则不会
   
   2. 如果子组件中的props没有申明，但父组件上传值了，那么可以在子组件中通过`$attrs`进行访问

2. $listeners。和$attrs类似，只不过使用的是v-on='$listeners'，子组件可以拿到父组件的方法(不含`.native`)

3. provide/inject。无论层级有多深，都可以直接访问到，不推荐使用，会导致数据流混乱，如：

```js
    // 父组件 A
    export default {
        provide: {
            data: 1
        }
    }
    // 子组件 B
    export default {
        inject: ['data'],
        mounted() {
            // 无论跨几层都能获得父组件的 data 属性
            console.log(this.data) // => 1
        }
    }
```

### $parent/$children 

    获取父子组件实例

### ref

    如果用在组件上，那么获取的就是组件实例，如果用在DOM上，那么获取的就是DOM对象