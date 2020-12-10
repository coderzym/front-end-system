// 其实就是if-else的梭哈
class Validate {
    constructor() {
        this.cache = []
        if (Array.isArray(arguments[0])) {
            // 数组的单个元素{rule:string[规则的名称],value:any[校验的值],efn:fn[失败的回调]}
            this.cache = arguments[0]
        }
        // 传入参数为对象时
        this.cache.push(arguments[0])
    }
    // 执行校验,失败的话执行失败的回调，成功静默，所有的参数符合规则则返回true
    valid() {
        let i = 0
        for (const value of this.cache) {
            if (rules[value.rule] && rules[value.rule](value.value)) {
                i++
            } else {
                if (value.efn) value.efn()
                return false
            }
        }
        return i === this.cache.length
    }
}