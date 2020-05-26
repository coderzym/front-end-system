// 入口类
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        this.$options = options
        if (this.$el) {
            // 指令分发
            new Observe(this.$data)
            new Compile(this.$el, this)
        }
    }
}
// 创建watcher，主要是对比新值和旧值是否有变化？所以要去获取值
class Watcher {
    constructor(expr, vm, cb) {
        this.expr = expr
        this.vm = vm
        this.cb = cb
        // 保存旧值
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        Dep.target = this
        let oldVal = compileUtil.getVal(this.expr, this.vm)
        Dep.target = null
        return oldVal
    }
    update() {
        let newVal = compileUtil.getVal(this.expr, this.vm)
        if (newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}
// 创建Dep，可以把它想成通知watcher更新的类，收集依赖
class Dep {
    constructor() {
        // 创建一个watcher池
        this.subs = []
    }
    // 添加watcher
    addSubs(watcher) {
        this.subs.push(watcher)
    }
    // 发布订阅
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
// 给data中的每一个数据进行绑定get和set方法
class Observe {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        // 只对object类型的data进行操作
        if (data && typeof data === 'object') {
            this.define(data)
        }
    }
    define(data) {
        // 遍历data中的每一个属性，绑定get和set
        Object.keys(data).forEach(key => {
            // 使用递归将每一个属性都拿出来
            let value = data[key]
            this.observe(value)
            let dep = new Dep()
            Object.defineProperty(data, key, {
                get() {
                    // 在数据劫持的时候，就绑定dep依赖
                    if (Dep.target) {
                        dep.addSubs(Dep.target)
                    }
                    return value
                },
                set: (newVal) => {
                    if (value !== newVal) {
                        this.observe(newVal)
                        value = newVal
                        // 发布通知
                        dep.notify()
                    }
                }
            })
        })
    }
}
// 处理vue指令的集合
const compileUtil = {
    // node代表当前的节点，expr代表变量表达式，如msg、name等，vm代表实例，因为是在实例上操作
    // 获取值
    getVal(expr, vm) {
        // 表达式如[person.name]被分割后就变成[person, name]，然后在data中遍历，
        // 就取到了data[person]，最后又取到了data[person][name]
        // reduce总是拿到上一次的执行结果再进行下一次的遍历
        return expr.split('.').reduce((data, currentValue) => {
            return data[currentValue]
        }, vm.$data)
    },
    setVal(expr, vm, newVal) {
        expr.split('.').reduce((data, currentValue) => {
            data[currentValue] = newVal
        }, vm.$data)
    },
    // 获取最新的data
    getContent(expr, vm, reg) {
        return value = expr.replace(reg, (...args) => {
            return this.getVal(args[1], vm)
        })
    },
    text(node, expr, vm, reg) {
        let fn = this.updater.updateText,
            value
        // 实现插值表达式
        if (expr.indexOf('}}') !== -1) {
            value = expr.replace(reg, (...args) => {
                // 用正则将expr中的大括号都去掉，拿到expr表达式传入getVal中获取数据
                new Watcher(args[1], vm, () => {
                    fn(node, this.getContent(expr, vm, reg))
                })
                return this.getVal(args[1], vm)
            })
        } else {
            value = this.getVal(expr, vm)
        }
        fn(node, value)
    },
    html(node, expr, vm) {
        let value, fn = this.updater.updateHtml
        new Watcher(expr, vm, (newVal) => {
            fn(node, newVal)
        })
        value = this.getVal(expr, vm)
        fn(node, value)
    },
    model(node, expr, vm) {
        let value, fn = this.updater.updateModel
        new Watcher(expr, vm, (newVal) => {
            fn(node, newVal)
        })
        node.addEventListener('input', (e) => {
            this.setVal(expr, vm, e.target.value)
        })
        value = this.getVal(expr, vm)
        fn(node, value)
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    // 将值添加在页面上
    updater: {
        updateText(node, value) {
            node.textContent = value
        },
        updateHtml(node, value) {
            node.innerHTML = value
        },
        updateModel(node, value) {
            node.value = value
        }
    }
}
// 编译类
class Compile {
    constructor(el, vm) {
        // 解析指令前，需要判断传入的el是否为元素节点，如果不是则需要去页面取el
        let element = this.isElement(el) ? el : document.querySelector(el), fragment
        // 为了节约性能，将页面上的DOM都转移到内存中进行操作
        fragment = this.node2fragment(element)
        this.vm = vm
        // 开始编译fragment
        this.compile(fragment)
        // 将编译好的fragment添加到页面上
        element.appendChild(fragment)
    }
    compile(fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
            // 判断节点类型，根据不同的类型进行操作
            if (this.isElement(child)) {
                // 编译元素
                this.compileElement(child)
                // 递归判断节点是否还有子节点，并进行操作
                this.compile(child)
            } else {
                // 编译文本
                this.compileText(child)
            }
        })
    }
    compileElement(node) {
        let elementAttr = node.attributes;
        [...elementAttr].forEach(attr => {
            // 解构赋值，取出元素属性，拿到方法名和方法值
            const { name, value: expr } = attr
            if (this.isVue(name)) {
                // 对拿到的字符串进行分割，区分不同的指令
                let [, vueDirectName] = name.split('-'),
                    [directName, eventName] = vueDirectName.split(':')
                // 将不同的指令通过不同的函数处理
                compileUtil[directName](node, expr, this.vm, eventName)
                // 将页面上带有vue的方法名删掉
                node.removeAttribute('v-' + vueDirectName)
            }
        })
    }
    isVue(name) {
        // 只对vue指令进行处理
        return name.startsWith('v-')
    }
    compileText(node) {
        // 解析文本节点，文本节点特殊在有大括号，所以需要正则表达式找到具有大括号的字段
        let reg = /\{\{(.+?)\}\}/g, content = node.textContent
        if (reg.test(content)) {
            // 因为文本是确定的，所以直接使用文本
            compileUtil['text'](node, content, this.vm, reg)
        }
    }
    isElement(node) {
        return node.nodeType === 1
    }
    // fragment具有移动性，所以可以保证每次取到的都是第一个节点
    node2fragment(elementNode) {
        let fragment = document.createDocumentFragment(), child
        while (child = elementNode.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    }
}