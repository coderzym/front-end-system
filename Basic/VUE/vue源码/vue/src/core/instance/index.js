import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  // 判断当前是否为生产环境，并且是否为Vue实例
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 对我们传入的列表进行初始化操作
  this._init(options)
}

// 给Vue原型上挂载一系列属性和方法。这里就只简单的介绍下
// 混入初始化方法，初始化了一系列生命周期函数，稍后细看
initMixin(Vue)
// 混入状态方法，给Vue原型上添加了$set和$delete等方法
stateMixin(Vue)
// 混入事件对象方法，给Vue原型上添加了$on $off $once $emit等方法
// 为以后手动调用事件提供了方便
eventsMixin(Vue)
// 混入生命周期方法，添加了_update方法，用于更新vnode
lifecycleMixin(Vue)
// 混入渲染方法，添加了nextTick异步渲染方法
renderMixin(Vue)

export default Vue
