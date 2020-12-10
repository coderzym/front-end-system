Function.prototype.Call = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let res = [...arguments].slice(1) ? context.fn(...[...arguments].slice(1)) : context.fn()
    delete context.fn
    return res
}

let firstName = "John1", lastName = "Doe1"

let person = {
    fullName: function (city, country) {
        console.log(this.firstName + " " + this.lastName + "," + city + "," + country)
    }
}

let person1 = {
    firstName: "John",
    lastName: "Doe"
}

person.fullName.Call(1)