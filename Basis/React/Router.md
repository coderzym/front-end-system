React 的路由需要我们自己安装：

## 命令

npm i react-router-dom -S

## 导入

使用前我们需要导入 React 路由

```js
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
```

## 路由分类

HashRouter 和 BrowserRouter，这个和 Vue-Router 相同，但`router-link`的 API 使用方式和 Vue 不同，Vue 是可以直接写 + Tag 的形式，而 React 只能在`HTML标签中`写`Link`，下面写 2 个例子：

```js
// 第一种
<Router>
  <Route path="/home" component={Home}></Route>
  <Route path="/mine" component={Mine}></Route>
</Router>

// 第二种
<Router>
  <a><Link to="/home" component={Home}></Link></a>
  <a><Link to="/mine" component={Mine}></Link></a>
</Router>
```

## exact 和 strict 匹配规则

#### exact

exact 的意思是精准匹配。当我们访问路由下的子路由时，路由的页面可能也会显示，而我们只需要显示子路由，所以可以在路由上添加`exact={true}`或者`exact`

#### strict

strict 的意思是严格匹配。可能在某些情况下，url 地址栏会出现不可预期的路由参数，如`home/`，而不是`home`，为了防止错误的显示，我们可以添加`strick`或者`strick={true}`

## 404 页面处理

直接在`Router`中添加`component={404Page}`，当输入一个不存在的页面时，就会进入`404`页面

## 更简洁的写法

```js
<Route path="/render" render={() => <div>Hello Render</div>}></Route>
<Route path="/render" render={() => "component's name"}></Route>
```

## 路由传递参数

直接在`Route标签`中添加参数变量即可，比如模板是`<Nav name="你好" />`，那么取值就是`{props.name}`。很好理解，`APP页面中`通过`Nav中name属性`将值传过去，在`Nav组件中`使用`{props.name}`取值

## NavLink 高亮

```js
<Router>
  <NavLink activeClassName="your css Name" />
</Router>
```

`NavLink`在路由被选中时，会有一个`active类名`，可以对其进行设置。也可以使用`activeClassName`来自定义类名。具体可以去看官方文档，API 就不深入讲解了

## 跳转携带参数

和 Vue 如出一辙，`/:键名`，取值的话，组件中接受一个`props`参数，可以通过`props.match.params.键名`取值，传递多个的话，`/:键名/:键名`，加`?`代表可有可无，如`/:键名?`，也就是`Link to Object`对象，`to={ 填写要传递的键值对 }`

## 路由重定向

React 中使用`<Redirect to="/" />`进行路由重定向

## 路由跳转的其他方法

```js
const Mine = (props) => {
  const click = () => {
    props.history.replace("/")
  }

  return (
    <div>
      <!--- your code -->
    </div>
  )
}
```

## 路由高阶组件

当路由没有被直接管理的时候，无法进行跳转，所以我们需要使用`withRouter(组件名)`，不要忘记引入：
```js
import { withRouter } from 'react-router-dom'
```