class Wife {
    constructor(name) {
        this.name = name
        this.money = 100
        console.log(`我的老婆是${this.name}`);
    }
}

function Do(wife) {
    console.log(wife.money += 50)
}

let xx = new Wife('xx')

Do(xx)