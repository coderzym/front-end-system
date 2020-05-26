// // 原型链继承
// Parent.prototype = {
//     age: 18,
//     give() {
//         console.log(`${this.name}，只要你小于${this.age}，没钱就来找我要`)
//     }
// }

// function Parent(name, money) {
//     this.name = name
//     this.money = money
// }

// function Son(name) {
//     this.name = name
// }

// Son.prototype = new Parent('xx', 5000)

// Son.prototype.money = 10000000

// let son1 = new Son('ym')

// console.log(son1.money); // 10000000

// son1.give() // ym，只要你小于18，没钱就来找我要

// let son2 = new Son('ry')

// son2.__proto__.__proto__.age = 30

// son1.give() // ym，只要你小于18，没钱就来找我要
// son2.give() // ry，只要你小于30，没钱就来找我要

// // 借用构造函数继承
// function Parent() {
//     this.name = name
//     this.age = age
//     this.give = function () {
//         console.log(`${this.name}，只要你小于${this.age}，没钱就来找我要`)
//     }
// }

// function Son() {
//     this.name = name
//     this.age = age
//     Parent.call(this)
// }

// let son1 = new Son()

// // 组合继承
// Parent.prototype = {
//     give() {
//         console.log(`${this.name}，只要你小于${this.age}，没钱就来找我要`)
//     }
// }

// function Parent() {
//     console.log(`${this.name}，只要你小于${this.age}，没钱就来找我要`)
// }

// function Son(name, age) {
//     this.name = name
//     this.age = age
//     Parent.call(this)
// }

// Son.prototype = new Parent()

// Son.prototype.constructor = Son

// 原型式继承
// Parent.prototype = {
//     give() {
//         console.log(`${this.name}，只要你小于${this.age}，没钱就来找我要`)
//     }
// }

// function Parent(obj) {
//     function Son() {}
//     Son.prototype = obj
//     return new Son()
// }

// function Obj() {
//     this.name = name
//     this.give = function () {
//         console.log('请给我钱')
//     }
// }

// let son1 = Parent(Obj)

// console.log(son1 instanceof Obj)
// console.log(son1.__proto__ === Obj)

// // 寄生式继承
// function Parent(obj) {
//     let parent = Object.create(obj)
//     parent.give = function () {
//         console.log(this.name)
//     }
//     return parent
// }
// function Parent(obj) {
//     function parent() {}
//     parent.prototype = obj
//     parent.prototype.give = function () {
//         console.log('你真狗')
//     }
//     return new parent()
// }
// const obj = {
//     name: 'xx',
//     age: 18
// }
// let p1 = Parent(obj)
// p1.give()

// // 混入式继承
// Father.prototype.callMom = function () {
//     console.log('找你妈要钱去')
// }

// Mother.prototype.callDad = function () {
//     console.log('找你爸要钱去')
// }

// function Father() {}

// function Mother() {}

// function Son() {}

// Son.prototype = Object.create(Father.prototype)

// let son1 = new Son()

// son1.callMom()

// Object.assign(Son.prototype, Mother.prototype)

// son1.callDad()

// ES6 class extends
// class Father {
//     constructor() {
//         this.callMom = function () {
//             console.log('告诉你妈是我让你来找她要钱的')
//         }
//     }
// }

// class Son extends Father {
//     constructor() {
//         super()
//     }
// }

// let son = new Son()

// son.callMom() // 告诉你妈是我让你来找她要钱的

// 寄生组合式继承
// function Parent(name) {
//     this.name = name
// }

// Parent.prototype.give = function () {
//     console.log('舒服');
// }

// function Child(money) {
//     this.money = money
//     Parent.call(this)
// }

// Child.prototype = Object.create(Parent.prototype)
// Child.prototype.constructor = Child