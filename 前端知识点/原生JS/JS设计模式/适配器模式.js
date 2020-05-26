class Old {
    love() {
        return '我想换个车'
    }
}

class New {
    constructor() {
        this.newCar = new Old()
    }
    love() {
        let a = this.newCar.love()
        console.log(a)
    }
}

let b = new New()
b.love()