let drag = document.querySelector('.drag'),
    flag = false

drag.addEventListener('mousedown', function (e) {
    let eX = e.clientX - drag.style.left
    let eY = e.clientY - drag.style.top
    flag = true
    drag.addEventListener('mousemove', function (e) {
        if (flag) {
            drag.style.left = drag.style.left < 0 ? 0 : e.clientX - eX + 'px'
            drag.style.top = drag.style.top < 0 ? 0 : e.clientY - eY + 'px'
        }
    })
    drag.addEventListener('mouseup', function () {
        flag = false
    })
})