var array = [1, 2, 1, 2, 3], newArr = []

// 1.使用双层for循环
// for (let i = 0; i < array.length; i++) {
//     let j = array[i], num
//     for (let i = 0; i < newArr.length; i++) {
//         num = newArr[i]
//     }
//     if (j !== num) {
//         newArr.push(j)
//     }
// }

// 2.使用indexOf
// array.forEach(v => {
//     if (newArr.indexOf(v) === -1) {
//         newArr.push(v)
//     }
// })

// 3.使用new Set数据结构
// [...new Set(array)]

// 4.排序后去重
// array.sort((a, b) => {
//     return a - b
// })
// for (let i = 0; i < array.length; i++) {
//     if (array[i] !== array[i - 1] && array[i] !== array[i + 1]) {
//         newArr.push(array[i])
//     }
// }

// console.log(newArr);

// 4.综合
// var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
// Array.prototype.flat = function () {
//     var newArr = []
//     newArr = Array.from(new Set(this.toString().split(',').map(item => newArr.push(+item))))
//     newArr.sort((a, b) => {
//         return a - b
//     })
//     return newArr
// }
// let a = arr.flat()
// console.log(a);