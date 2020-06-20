## React生命周期函数

#### getDefaultProps getInitialState

初始化Props和State

#### componentWillMount 

组件挂载前

#### 中间有一个render函数执行的过程

#### componentDidMount 

组件挂载完成

#### shouldComponentUpdate 

返回true/false，代表是否可以执行

#### componentWillUpdate

数据修改之前执行，如state/props

#### componentDidUpdate

数据修改之后执行，如state/props

#### componentWillReceiveProps 

props发生更改前执行，这里子组件无法改变父组件的props，但父组件可以

#### componentWillUnmount

组件卸载前执行

## setState是同步还是异步

可以是同步，也可以是异步。如果是在setState中添加了回调函数，那么就是同步修改状态

## ref

在state中使用React.createRef()定义，有多少个，那就使用多少次这个方法，如：

```js
this.stateRef = React.createRef()
```

## 组件之间的数据交互

onChange事件，将子级的状态同步到父级中，状态改变后通过父级分发到各个子组件中

## 组合和继承

在组件的标签之间写入HTML结构，组件就会认为是它的children，通过this.props.children访问到

