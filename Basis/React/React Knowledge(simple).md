## React 生命周期函数

#### getDefaultProps getInitialState

初始化 Props 和 State

#### componentWillMount

组件挂载前

#### 中间有一个 render 函数执行的过程

#### componentDidMount

组件挂载完成

#### shouldComponentUpdate

返回 true/false，代表是否可以执行

#### componentWillUpdate

数据修改之前执行，如 state/props

#### componentDidUpdate

数据修改之后执行，如 state/props

#### componentWillReceiveProps

props 发生更改前执行，这里子组件无法改变父组件的 props，但父组件可以

#### componentWillUnmount

组件卸载前执行

## setState 是同步还是异步

可以是同步，也可以是异步。如果是在 setState 中添加了回调函数，那么就是同步修改状态

## ref

在 state 中使用 React.createRef()定义，有多少个，那就使用多少次这个方法，如：

```js
this.stateRef = React.createRef();
```

## 组件之间的数据交互

onChange 事件，将子级的状态同步到父级中，状态改变后通过父级分发到各个子组件中

## 组合和继承

在组件的标签之间写入 HTML 结构，组件就会认为是它的 children，通过 this.props.children 访问到
