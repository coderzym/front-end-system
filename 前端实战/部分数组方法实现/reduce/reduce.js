// reduce函数接收2个参数，一个函数，一个初始值
// 函数内可接收4个参数 分别是 初始值 当前元素 当前元素索引 当前元素所属对象
// 最后只返回一个最终结果

Array.prototype.reduce = function (fn, initial) {
    let arr = this,
        base = typeof initial === 'undefined' ? arr[0] : initial,
        startIndex = typeof initial === 'undefined' ? 1 : 0
    arr.slice(startIndex).forEach((v, i) => {
        base = fn(base, v, i + startIndex, arr)
    })
    return base
}

var arr = [1, 2, 3, 4]
arr.reduce((total, currentValue, currentIndex, arr) => {
    console.log(total, currentValue, currentIndex, arr)
    return total + currentValue
}, 10)