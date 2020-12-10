Array.prototype.push = function (args) {
    let len = this.length
    if (typeof args !== 'undefined') {
        this[len] = args
        return len
    }
}

let a1 = [1, 2, 3],
    last = a1.push(4)
console.log(last, a1)