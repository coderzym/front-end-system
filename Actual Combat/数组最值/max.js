var arr = [6, 4, 1, 8, 2, 11, 23], max, min, a, b, index

// 1.for循环
// for (let i = 0; i < arr.length; i++) {
//     index = arr.length - 1
//     a = arr[i], b = arr[arr.length - index]
// max = a > b ? a : b
//     if (index >= 0) {
//         index--
//     }
// }
// console.log(max)

// 2.sort排序
// arr.sort((a, b) => {
//     return a - b
// })
// max = arr[arr.length - 1]
// console.log(max);

// 3.reduce方法
// arr.reduce((pre, next) => {
//     return max = Math.max(pre, next)
// }, arr[0])
// console.log(max);

// 4.apply以及ES6的扩展运算符...后使用Math.max 这里就不再赘述

// 5.max比较下一个值，和使用reduce差不多
// var res = arr[0]
// for (let i = 0; i < arr.length; i++) {
//     max = Math.max(res, arr[i])
// }
// console.log(max)