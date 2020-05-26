// map方法接收一个函数和一个数组，返回一个数组，数组中每一个值都是函数处理后的值

Array.prototype.map = function(fn, context) {
    // 这里的this就是指调用的数组
    let obj = new Object(this),
        A = [],
        res
    for (let i = 0; i < obj.length; i++) {
        res = fn.call(context, obj[i])
        A[i] = res
    }
    return A
}

let arr = ["x", "y", "z"];
let obj = { a: 1 };

arr.map(function () {
    console.log(this.a);
}, obj);

