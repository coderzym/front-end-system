function add(...args) {
    let res = 0
    args.forEach(item => res += item)
    return function curried(...args) {
        allArgs = allArgs.concat(args)
        return add.length > allArgs.length ? curried() : add.apply(null, allArgs)
    }
}

add(1)
add(1)(2)
add(1, 2, 3);
add(1, 2)(3);
add(1)(2, 3);
add(1)(2)(3);