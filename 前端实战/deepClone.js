var obj1 = {
    a: 123,
    b: 456,
    c: 'aaa',
    d: {
        e: 'bbb',
        f: [1, 2, 3]
    }
}

function deep(obj, hash = new WeakMap()) {
    // 如果是null或者非对象类型的值直接返回
    if (!obj instanceof Object) return obj
    // 如果这个对象已经被拷贝过，那就直接返回，以防死递归
    if (hash.has(obj)) return hash.get(obj)
    // 如果是日期对对象，直接返回
    if (obj instanceof Date) return new Date(obj)
    // 如果是正则对象，直接返回
    if (obj instanceof RegExp) return new RegExp(obj)
    // 给hash中存储，首先构造一个h出来
    let h = new obj.constructor()
    // 开始存储
    hash.set(obj, h)
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            h[k] = deep(obj[k], hash)
        }
    }
    return h
}

console.log(deep(obj1));