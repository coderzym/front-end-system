1. 通过 `onXxxx` 属性指定的事件处理函数，原生的是 `onxxxx`，注意大小写

- React 使用的是自定义合成事件，而不是原生的 DOM 事件
- React 中的时间是通过事件委托的形式处理的，委托给组件最外层的元素

2. 通过 `event.target` 得到发生事件的 DOM 元素对象

```js
class Example extends React.Component {
  showData = event => {
    console.log(event.target.value); // 输出的就是input框元素
  };

  render() {
    return <input onClick={this.showData} />;
  }
}
```

可用上面这种形式代替`ref`
