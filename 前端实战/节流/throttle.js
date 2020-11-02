var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttle(getUserAction, 3000, true)

function throttle(fn, wait, flag) {
    var self = this,
        res,
        timeout,
        remaining = flag === true ? 0 : wait 
    function throttled() {
        if (!timeout) {
            timeout = setTimeout(() => {
                res = fn.apply(self, arguments)
                timeout = null
                remaining = wait
            }, remaining);
        }
        return res
    }
    return throttled
}

// function throttle(fn, wait, options = {}) {
//     var timeout, _this, previous = 0
//     function later() {
//         previous = options.leading === false ? 0 : +new Date().getTime()
//         timeout = null
//         fn.apply(_this, arguments)
//     }
//     var throttled = function () {
//         var now = +new Date()
//         if (!previous && options.leading === false) {
//             previous = now
//         }
//         remaining = wait - (now - previous)
//         _this = this
//         if (remaining <= 0) {
//             if (timeout) {
//                 clearTimeout(timeout)
//                 timeout = null
//             }
//             previous = now
//             fn.apply(_this, arguments)
//         } else if (!timeout && options.trailing !== false) {
//             timeout = setTimeout(later, remaining);
//         }
//     }
//     throttled.cancel = function () {
//         clearTimeout(timeout)
//         previous = 0
//         timeout = null
//     }
//     return throttled
// }