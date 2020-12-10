class createCar {
    constructor(fn) {
        this.update = fn
    }
}

class driveCar {
    constructor() {
        this.person = []
    }
    add(fn) {
        this.person.push(fn)
    }
    update() {
        this.person.forEach(v => v.update())
    }
}

function fn() {
    console.log('成功')
}

let car1 = new createCar(fn),
    person1 = new driveCar()
person1.add(car1)
person1.update()