Function.prototype.Call = function (context) {
    if (typeof context === 'undefined' || context === null) {
        context = window
    }
    context.fn = this
    let args = [...arguments].slice(1),
        res = context.fn(...args)
    delete context.fn
    return res
}

var firstName = "John1", lastName = "Doe1"

var person = {
    fullName: function (city, country) {
        console.log(this.firstName + " " + this.lastName + "," + city + "," + country)
    }
}
var person1 = {
    firstName: "John",
    lastName: "Doe"
}

person.fullName.Call(1)