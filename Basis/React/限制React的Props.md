##### Props 传值

我们在使用 React 的时候需要从外面传值进来，那么就得使用 Props，诸如：

```js
<Example name="zym" age={18} />
```

也可以通过这种形式传值：

```js
const obj = {
  name: "zym",
  age: 18,
};

<Example {...obj} />;
```

##### Props 限制

接着上面的例子，比如 Prop 只能用字符串类型，然后不传的话，默认是多少：

```js
class Example {
  static propTypes = {
    name: React.PropTypes.string, // 限制类型，这种写法最高仅支持React 15版本，16版本已经弃用
    age: React.PropTypes.number.isRequired, // age为必传
    skill: React.PropTypes.func, // 限制为函数
  };

  // 给Example类中的属性加默认值
  static defaultProps = {
    name: "zym",
    age: 18,
  };
}

<Example {...obj} />;
```

函数式组件的 Prop 传递如下：

```js
function Example(props) {
  console.log(props); // { name: "zym", age: 18}
  return {
    // do something
  };
}

Example.propTypes = {
  name: React.PropTypes.string, // 限制类型，这种写法最高仅支持React 15版本，16版本已经弃用
  age: React.PropTypes.number.isRequired, // age为必传
  skill: React.PropTypes.func, // 限制为函数
};

Example.defaultProps = {
  name: "zym",
  age: 18,
};

<Example name="zym" age={18} />;
```
