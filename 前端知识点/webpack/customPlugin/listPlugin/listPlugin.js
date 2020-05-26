class listPlugin {
    constructor(options) {
        this.options = options || {}
        this.filename = this.options.filename || 'list.md'
    }
    apply(compiler) {
        // tapAsync方法
        compiler.hooks.emit.tapAsync('listPlugin', (compilation, cb) => {
            let filename = this.filename,
                len = Object.keys(compilation.assets).length,
                content = `# 一共有${len}个文件\n`
            for (let filename in compilation.assets) {
                content += `\n${filename}`
            }
            compilation.assets[filename] = {
                source: function () {
                    return content
                },
                size: function () {
                    return len
                }
            }
            cb()
        })
        // tapPromise方法
        compiler.hooks.emit.tapPromise('listPlugin', compilation => {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            }).then(() => {
                let filename = this.filename,
                    len = Object.keys(compilation.assets).length,
                    content = `# 一共有${len}个文件\n`
                for (let filename in compilation.assets) {
                    content += `\n${filename}`
                }
                compilation.assets[filename] = {
                    source: function() {
                        return content
                    },
                    size: function() {
                        return content.length
                    }
                }
            })
        })
    }
}

module.exports = listPlugin