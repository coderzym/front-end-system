class watchPlugin {
    constructor(options) {
        this.options = options || {}
    }
    apply(compiler) {
        compiler.hooks.watchRun.tapAsync('watchPlugin', (compiler, cb) => {
            let mtimes = compiler.watchFileSystem.watcher.mtimes,
                mtimesKeys = Object.keys(mtimes)
            if (mtimesKeys.length > 0) {
                console.log(`本次一共改动了${mtimesKeys.length}个文件,目录为:`)
                console.log(mtimesKeys)
                console.log('------------分割线-------------')
            }
            cb()
        })
        compiler.hooks.watchClose.tap('watchPlugin', () => {
            console.log('本次监听停止了哟～👋👋👋')
        })
    }
}

module.exports = watchPlugin