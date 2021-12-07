## 旧版本的 React 生命周期

先引出一个洋葱模型，

![avatar](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/15/16f0a0b3e1f4f59f~tplv-t2oaga2asx-watermark.awebp)

```js
<Father>
  <Son>
    <GrandSon></GrandSon>
  </Son>
</Father>
```

触发顺序是，`Father.componentWillMount => Son.componentWillMount => GrandSon.componentWillMount => GrandSon.componentDidMount => Son.componentDidMount => Father.componentDidMount`，在`同步Task`的情况下和 Vue 框架也是一样的概念。如果是`异步`，上面的顺序就会被打乱。

## 常见问题

1. 当外部的 props 改变时，如何再次执行请求数据、更改状态等操作？

使用 `componentWillReceiveProps`，

```js
componentWillReceiveProps(nextProps) {
    // 当父组件的 props 改变时，重新请求数据
    if (nextProps.id !== this.props.id) {
      this.setState({externalData: null});
      this._loadAsyncData(nextProps.id);
    }
  }
```
