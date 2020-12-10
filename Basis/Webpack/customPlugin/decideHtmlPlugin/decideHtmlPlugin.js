class decideHtmlPlugin {
    constructor() {}
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('decideHtmlPlugin', compiler => {
            let plugins = compiler.options.plugins,
                hasHtmlWebpackPlugin = plugins.some(plugin => {
                    console.log(plugin)
                    console.log(plugin.__proto__)
                    return plugin.__proto__.constructor.name === 'HtmlWebpackPlugin'
                })
            if (hasHtmlWebpackPlugin) {
                console.log('使用了html-webpack-plugin')
            }
        })
    }
}

module.exports = decideHtmlPlugin