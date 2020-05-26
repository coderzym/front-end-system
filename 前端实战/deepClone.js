var obj1 = {
    a: 123,
    b: 456,
    c: 'aaa',
    d: {
        e: 'bbb',
        f: [1, 2, 3]
    }
}

function deep(obj) {
    if (typeof obj !== 'object') return
    var newObj = obj instanceof Array ? [] : {}
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = typeof obj[k] === 'object' ? deep(obj[k]) : obj[k]
        }
    }
    return newObj
}
console.log(deep(obj1));