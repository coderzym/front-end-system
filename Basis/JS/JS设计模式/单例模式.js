// 确保全局就存在一个实例，如Vue就是一个实例

class Cat {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    static callName(name, age) {
        if (!this.instance) {
            this.instance = new Cat(name, age)
        }
        return this.instance
    }
}

let cat1 = Cat.callName('cat1', 18)
let cat2 = Cat.callName('cat2', 18)

console.log(cat1, cat2);