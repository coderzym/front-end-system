var arr = [1, [2, [3, 4, [5, [6, 7]]]]], newArr = []

// 1.使用ES6的flat方法
// console.log(arr.flat(5));

// 2.循环判断数据类型
// function flatten(o) {
//     for (let i = 0; i < o.length; i++) {
//         if (o[i] instanceof Array) {
//             flatten(o[i])
//         } else {
//             newArr.push(o[i])
//         }
//     }
// }
// flatten(arr)
// console.log(newArr);

// 3.toString + split + map()，map高级数组方法返回一个新数组
// newArr = arr.toString().split(',').map(v => {
//     return +v
// })
// console.log(newArr);

// 4.reduce高级数组方法
// function flatten(arr) {
//     return arr.reduce((pre, next) => {
//         return pre.concat(Array.isArray(next) ? flatten(next) : next)
//     }, [])
// }
// console.log(flatten(arr));

// 5.合理利用map
Array.prototype.flat = function () {
    return this.toString().split(',').map(item => +item)
}