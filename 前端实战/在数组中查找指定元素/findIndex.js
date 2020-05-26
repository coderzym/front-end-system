function findIndex(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return i
        }
    }
    return -1
}

function isBigEnough(element) {
    return element >= 15;
}

findIndex([12, 5, 8, 130, 44], isBigEnough)