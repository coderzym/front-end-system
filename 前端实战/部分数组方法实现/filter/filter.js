Array.prototype.filter = function (fn, context) {
    let newArr = [],
        arr = this,
        res
    for (let i = 0; i < arr.length; i++) {
        res = fn.call(context, arr[i], i, arr)
        if (res) newArr.push(arr[i])
    }
    return newArr
}

let arr = ["x", "y", "z", 1, 2, 3];

console.log(arr.filter(item => typeof item === "string"));