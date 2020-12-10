## Redux

#### 安装

```js
npm i redux -S-D
```

#### redux和react-redux的区别

后者只是为了在react中更方便的使用redux而已

#### 开始使用

1. 引入创建store仓库

```js
import { createStore } from 'redux'
```

光靠导入是不够的，我们还得在文件夹中创建一个文件，并导出，例子如下：

```js
export default reducer = (state, action) => {
    switch(action.type){
        case 你的条件:
            你的操作;
        case 你的条件:
            你的操作;
        case 你的条件:
            你的操作;
    }
}
```

这个时候就可以将它导入：
```js
import reducer from 文件目录
```

2. 将两者连接起来

```js
const store = createStore(reducer)
```

3. 根据操作进行不同的处理

```js
<App 
    onIncrement={ () => {store.dispatch( {type: '你的条件'} )} }
/>
```

通过这个步骤，就会将定义的状态联系起来，我们也就可以通过`store.getState()`获取数据

4. 光是获取数据可不够

因为仅仅只是获取了，你想让它重新渲染可以使用`store.subscribe(你的函数)`

## React-Redux

#### 安装

```js
npm i react-redux -S-D
```

#### 用法

1. 和Redux一样，需要引入`Provider`


```js
//index.js文件中
import { Provider } from 'react-redux'

// 和上面一样，这个reducer是其他文件里面导出的对象
const store = createStore(reducer)

<Provider store={ store }>
    <App />
</Provider>
```

```js
//组件文件中
import { connect } from 'react-redux'

// 其实这个名字也可以随便取
const mapStateToProps = state => {
    return {
        counter: state
    }
}

export default connect(mapStateToProps)(你的组件名)
```

## Redux中间件

#### 引入方式

```js
import { applyMiddleware } from 'redux'
```

#### 使用方式

```js
// 第一种写法
const logger = store => next => action => {
    let result = next(action)
    return result
}

// 第二种写法
function logger() {
    return function store() {
        return function next() {
            return function action() {}
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger,...可以有多个'logger'))
```

想要使用更牛逼的第三方中间件，可以直接安装一个：

```js
import logger from 'react-logger'

const store = createStore(reducer, applyMiddleware(logger))
```

## 异步中间件thunk

和上面的同步一样，我们只需要把异步的操作这样处理即可：

```js
applyMiddleware(thunk)
```

