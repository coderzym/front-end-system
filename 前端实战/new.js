function _new(obj) {
    let o = Object.create(obj.prototype),
        args = [...arguments].slice(1),
        res
    res = o.apply(null, args)
    return res instanceof Object ? res : obj
}