let body = document.querySelector('body'),
    box = document.querySelector('.box')

body.addEventListener('click', function (e) {
    e.target.attributes.href.value = `#${e.target.className}`
})

class Router {
    // 路由实现切换功能需要 路径(path) 对应path的回调函数(cb)
    constructor() {
        // 保存当前的路径
        this.currentUrl = ''
        // 保存所有的路由映射关系
        this.routes = {}
        // 因为监听事件是添加在window上，所以this指向window会导致报错，我们将绑定this指向为router实例
        this.update = this.update.bind(this)
        // window对象添加监听事件，当载入（用户刷新页面）和hash值改变的时候（用户跳转）调用回调函数
        window.addEventListener('load', this.update)
        window.addEventListener('hashchange', this.update)
    }
    update() {
        // 拿到当前页面#后面的值，如果没有hash，那么就默认为首页
        this.currentUrl = location.hash.split('#')[1] || ''
        this.routes[this.currentUrl]()
    }
    // 将路径和对应的回调函数绑定，这个语法应该很简单，给对象添加一个原本没有的属性
    save(path, cb) {
        this.routes[path] = cb
    }
}

const router = new Router()
router.save('', function() {
    box.style.backgroundColor = 'red'
})
router.save('a', function() {
    box.style.backgroundColor = 'red'
})
router.save('b', function() {
    box.style.backgroundColor = 'blue'
})
router.save('c', function() {
    box.style.backgroundColor = 'yellow'
})