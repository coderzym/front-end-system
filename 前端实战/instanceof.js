function _instanceof(left, right) {
    let left = left.__proto__,
        right = right.prototype
    if (typeof left !== 'object' ||  left === null) return false
        while (true) {
            if (left === right) {
                return true
            }
            if (left === null) {
                return false
            }
            left = left.__proto__
        }
}