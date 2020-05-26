Function.prototype.Bind = function (context) {
    if (typeof context === 'undefined' || context === null) {
        context = window
    }
    let _this = this,
        args = [...arguments].slice(1)
    function bound() {
        let thisArg = args.concat([...arguments].slice())
        return _this.apply(this instanceof bound ? this : context, thisArg)
    }
    bound.prototype = Object.create(_this.prototype)
    return bound
}