// // 工厂模式
// function Factory(options) {
//     const obj = {}
//     obj.name = options.name
//     obj.age = options.age
//     obj.fn = options.fn
//     return obj
// }

// let car = Factory({
//     name: 'benz',
//     age: 18,
//     fn() {
//         console.log(this)
//     }
// })

// console.log(car instanceof Factory)

// 构造函数模式
// function Person(name, age) {
//     this.name = name
//     this.age = age
//     this.fn = fn
// }

// function fn() {
//     console.log(this.name)
// }

// let person = new Person('benz', 18)

// person.fn()

// 原型模式
// function Car(name) {
//     this.callName = function () {
//         console.log(name)
//     }
// }

// Car.prototype = {
//     // 为了让我们明确constructor是谁，实际上constructor只是起到一个标识的作用，
//     // 更改constructor并不能继承更改后的属性和方法
//     constructor: Car,
//     name: ['xx', 'ym'],
//     brand: 'benz',
//     fn() {
//         console.log(this.name)
//     }
// }

// let car = new Car()
// let car2 = new Car()
// car.name.push('dn')
// car.fn()
// car2.fn()

// 组合模式
// function Car(name, age) {
//     this.name = name
//     this.age = age
// }

// Car.prototype = {
//     callName() {
//         console.log(this.name)
//     },
//     callAge() {
//         console.log(this.age)
//     }
// }

// let car1 = new Car('benz', 18)
// car1.callName() // benz
// car1.callAge() // 18

// let car2 = new Car('bwm', 12)
// car2.callName() // bwm
// car2.callAge() // 12

// if (typeof this.callName !== 'function') {
//     Car.prototype.callName = function () {
//         console.log(this.name)
//     }
//     Car.prototype.callAge = function () {
//         console.log(this.age)
//     }
// }

// 动态原型模式
// function Car(name, age) {
//     this.name = name
//     this.age = age
//     if (typeof this.callName !== 'function') {
//         Car.prototype.callName = function () {
//             console.log(this.name)
//         }
//         Car.prototype.callAge = function () {
//             console.log(this.age)
//         }
//     }
// }

// let car1 = new Car('benz', 18);
// car1.callName() // benz
// car1.callAge() // 18

// let car2 = new Car('bwm', 12)
// car2.callName() // bwm
// car2.callAge() // 12

// 寄生构造函数模式
// function Car(name) {
//     var obj = {}
//     obj.name = name
//     obj.callName = function () {
//         console.log(this.name);
//     }
//     return obj
// }

// let car1 = new Car('xx')
// car1.callName()

// 稳妥构造函数模式
// function Car(name) {
//     const obj = {}
//     obj.name = name
//     obj.callName = function () {
//         console.log(name)
//     }
//     return obj
// }

// let car = Car('xx') // xx
// car.callName()
// car.name = 'ym'
// car.callName() // xx

// ES5中最好的继承方式是寄生组合继承，它是先创建子类的this，然后使用Parent.call(this)将父类的属性和
// 方法都挂载到子类的this上

// ES6是先创建父类的this，然后使用Parent.prototype.call(this)指向子类