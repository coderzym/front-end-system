    loader相关

    file-loader：把文件输出到文件夹中，在代码中通过相对路径url去引用(处理字体和图片)

    url-loader：和file-loader类似，区别是永远可以设置阈值，大于这个值返回publicPath，小于则返回文件的base64形式编码

    image-loader：加载并压缩图片文件

    babel-loader：将ES6转化为ES5

    sass-loader：将SASS/SCSS转化为CSS

    css-loader：加载CSS，支持模块化、压缩、文件导入等特性

    style-loader：把css代码注入到JS中，通过DOM操作去加载CSS

    postcss-loader：配合autoprefixer插件自动补齐css3前缀

    vue-loader：加载vue.js单文件组件

    ts-loader：将TypeScript转化为JavaScript

    awesome-typescript-loader：将TypeScript转化为JavaScript，性能比ts-loader好

    webpack-bundle-analyzer：对bundle的体积进行监控和分析

    image-webpack-loader：压缩图片

plugin相关

    html-webpack-plugin：简化HTML文件创建，需要依赖html-loader

    web-webpack-plugin：为单页应用输出HTML，比html-webpack-plugin好用

    mini-css-extract-plugin：分离样式文件，CSS提取为独立文件，支持按需加载

    clean-webpack-plugin：清空打包目录

    serviceworker-webpack-plugin：为网页新增离线缓存功能

    optimize-css-assets-webpack-plugin：压缩CSS文件

    DefinePlugin定义全局常量

内置模块

    ProvidePlugin：不必到处使用import require进行引入