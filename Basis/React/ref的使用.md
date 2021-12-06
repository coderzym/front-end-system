# ref 的使用

在 Vue 里面可以通过 ref 去拿 DOM，React 里面也有这样的功能：

```js
class Example extends React.Component {
  showData = () => {
    const { input1 } = this.refs; // input的框
    alert(input1.value); // 弹出的就是下面input框的值
  };

  render() {
    return <input ref="input1" />;
  }
}
```

不过上面的这种写法是过时的，有 BUG，已经不被推荐使用（效率不高），推荐下面的两种形式：

1. 回调的形式

```js
class Example extends React.Component {
  showData = () => {
    const { input1 } = this; // input的框
    alert(input1.value); // 弹出的就是下面input框的值
  };

  render() {
    return <input ref={c => (this.input1 = c)} />;
  }
}
```

2. createRef 的形式
