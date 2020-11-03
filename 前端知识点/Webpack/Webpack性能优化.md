主要从两个方面入手，

1. `有哪些方式可以减少 Webpack 的打包时间`

2. `有哪些方式可以让 Webpack 打出来的包更小`

### 减少 Webpack 的打包时间

##### babel-loader

只让babel编译JS文件，也就是只给`js`后缀的文件使用babel-loader

```js
module.exports = {
    module: {
        rules: [
            {
                // js 文件才使用 babel
                test: /\.js$/,
                loader: 'babel-loader',
                // 只在 src 文件夹下查找
                include: [resolve('src')],
                // 不会去查找的路径
                exclude: /node_modules/
            }
        ]
    }
}
```

除此之外，最好给loader也加一个缓存，仅编译更改过的文件

```js
    loader: 'babel-loader?cacheDirectory=true'
```

##### HappyPack

`HappyPack` 可以将 `Loader` 的同步执行转换为并行的

```js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                // id 后面的内容对应下面
                loader: 'happypack/loader?id=happybabel'
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory'],
            // 开启 4 个线程
            threads: 4
        })
    ]
}
```

##### DllPlugin

DllPlugin 可以将特定的类库提前打包然后引入

```js
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
```

```js
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```

##### 代码压缩

在 `webpack 4` 中，我们已经不需要手动设置 `UglifyJS` 来压缩代码体积了，只需要将 `mode` 设置为 `production` 即可。我们还可以使用一些配置去删除 `console.log` 这类功能

### 减少 Webpack 打包后的文件体积

##### Scope Hoisting

它可以将多个模块打包到一个函数中去，开启的方法如下：

```js
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```

##### Tree Shaking

如果你使用 `Webpack 4` 的话，开启 `生产环境` 就会自动启动这个优化功能。

```js
    mode: "production"
```