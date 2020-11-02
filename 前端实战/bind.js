Function.prototype.Bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    let _this = this,
        args = [...arguments].slice(1)
    function bound() {
        let thisArg = args.concat([...arguments])
        return _this.apply(this instanceof bound ? this : context, thisArg)
    }
    bound.prototype = Object.create(_this.prototype)
    return bound
}