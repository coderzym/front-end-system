Array.prototype.pop = function () {
    let len = this.length,
        last = this[len - 1]
        if (len === 0) return undefined
    delete this[len - 1]
    --this.length
    return last
}

let a1 = [1, 2, 3],
    last = a1.pop()
console.log(last, a1)