var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction, 1000, true)

function debounce(fn, wait, doNow) {
    var timeout, self = this, res
    function deBounced() {
        if (doNow) {
            res = fn.apply(self, arguments)
            doNow = false
        } else {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                res = fn.apply(self, arguments)
            }, wait);
        }
        return res
    }
    deBounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }
    return deBounced
}

// function debounce(fn, wait, doNow) {
//     var timeout, result
//     function deBounced () {
//         var _this = this, args = arguments
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         if (doNow) {
//             var callNow = !timeout
//             if (callNow) {
//                 result = fn.apply(_this, args)
//             }
//             timeout = setTimeout(() => {
//                 timeout = null
//             }, wait);
//         } else {
//             timeout = setTimeout(() => {
//                 fn.apply(_this, args)
//             }, wait);
//         }
//         return result
//     }
//     deBounced.cancel = function () {
//         clearTimeout(timeout)
//         timeout = null
//     }
//     return deBounced
// }