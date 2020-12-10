function _instanceof(left, right) {
    // 左边的__proto__指向右边的prototype
    let left = left.__proto__,
        right = right.prototype
    if (typeof left !== 'object' ||  left === null) return false
    while (true) {
        if (left === right) return true
        if (!left) return false
        left = left.__proto__
    }
}