Function.prototype.Apply = function (context, argArr) {
    if (!(argArr instanceof Array)) {
        throw new Error('请传入一个数组')
    } else if (typeof context === 'undefined' || context === null) {
        context = window
    }
    context.fn = this
    let args = [...arguments].slice(1),
        res = context.fn(...args)
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

person.fullName.Apply(person1, ['laji'])