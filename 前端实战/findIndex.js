// findIndex方法接收一个回调函数，返回满足回调函数条件的下标

Array.prototype.findIndex = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i])) {
            return i
        }
    }
}

console.log([1, 2, 3, 4].findIndex(v => v == 4));