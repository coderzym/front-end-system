let body = document.querySelector('body'),
    box = document.querySelector('.box')

// window.addEventListener('popstate', function (e) {
//     console.log(e.state.obj)
// })

body.addEventListener('click', function () {
    router.run(location.hash)
})

class Router {
    constructor() {
        this.routes = {}
        this.path = ''
        window.addEventListener('popstate', e => {
            // let path = e.state
            // this.routes[path]()
        })
    }
    save(path, cb) {
        this.routes[path] = cb
    }
    run(path) {
        console.log(path);
        history.pushState({ path }, null, path)
    }
}

let router = new Router()
router.save('', function () {
    box.style.backgroundColor = 'red'
})
router.save('a', function () {
    box.style.backgroundColor = 'red'
})
router.save('b', function () {
    box.style.backgroundColor = 'blue'
})
router.save('c', function () {
    box.style.backgroundColor = 'yellow'
})