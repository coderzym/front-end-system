var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction, 1000, true)

// 接收三个参数，它们分别是回调、延迟时间、是否第一次立即执行
function debounce(fn, wait, doNow) {
    // 声明定时器容器，保存this指向，声明保存结果的容器
    var timeout, self = this, res
    function deBounced() {
        // 如果是立即执行
        if (doNow) {
            res = fn.apply(self, arguments)
            doNow = false
        } else {
            // 否则每次清除定时器
            clearTimeout(timeout)
            // 在一定时间后执行
            timeout = setTimeout(() => {
                res = fn.apply(self, arguments)
            }, wait);
        }
        return res
    }
    // 提供清除节流的方法
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