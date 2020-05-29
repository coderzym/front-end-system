// 先来看看forEach的调用
let arr = [1, 2, 3, 4]
// arr.forEach((v, k) => {
//     return v + 1
// })
// console.log(arr);

// forEach的回调方法一般接收两个参数，一个是回调函数，一个是标明this指向的，如果不传默认为undefined
Array.prototype.forEach = function (cb, context = undefined) {
    // 首先获得当前的数组
    if (!this instanceof Array || typeof cb !== 'function') return
    // 因为forEach不会改变原来的数组，所以我们要把调用的数组复制一份
    let arr = Array.prototype.slice.call(this)
    for (let i = 0; i < arr.length; i++) {
        cb.call(context, arr[i], i)
    }
    return arr
}
arr.forEach((v, k) => {
    console.log(v);
})