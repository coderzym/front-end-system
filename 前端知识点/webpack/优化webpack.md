优化webpack的构建速度

    1.使用高版本的webpack和node.js，注意兼容性问题

    2.多进程/多实例构建：thread-loader

    3.压缩代码：通过mini-css-extract-plugin提取Chunk中的css代码到独立的文件，再配置css-loader中的minimize选项开启cssnano

    4.压缩图片：image-webpack-loader

    5.缩小打包作用域：
        exclude/include：确定loader规则范围
        resolve.modules：指明第三方模块路径，减少不必要的查找
        resolve.extensions：忽略后缀名
        合理使用alias

    6.提取页面公共资源：
        基础包分离：
            1.通过html-webpack-plugin分离，然后将分离出来的通过CND引入，而不是打入bundle中
            2.使用SplitChunksPlugin进行公共部分分离，替代了CommonChunkPlugin

    7.利用缓存提高二次构建速度：
        1.babel-loader开启缓存
        2.cache-loader

    8.Tree shaking
        禁用babel-loader的模块解析，否则webpack收到的都是解析后的CommonJS模块，无法使用tree-shaking

    9.利用purgecss-webpack-plugin和glob去除无用css，格式如下：
        new PurgecssWebpackPlugin({
            paths: glob.sync('./src/**/*', {nodir: true})
        })