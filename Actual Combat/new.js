function _new(obj, ...args) {
    let o = Object.create(obj.prototype),
        res
    res = o.apply(null, args)
    return res instanceof Object ? res : obj
}