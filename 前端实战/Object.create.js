Object.prototype.create = function (proto) {
    function obj() {}
    obj.prototype = proto
    return new obj()
}