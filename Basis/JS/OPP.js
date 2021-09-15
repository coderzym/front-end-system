/* 创建对象

工厂模式

const createPerson = (name, age, job) => ({
  name: name,
  age: age,
  job: job,
  sayNam() {
    console.log(`I'm ${name}`);
  },
});

const person1 = createPerson("Ben", 21, "student");
const person2 = createPerson("Gray", 25, "Doctor");

构造函数模式

class Person {
  constructor(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  sayName() {
    console.log(this.name);
  }
}

原型模式

function Person() {}

Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName() {
    console.log(this.name);
  },
};

const person1 = new Person();
const person2 = new Person();

person1.friends.push("Van");

console.log(person1.friends); // 'Shelby,Court,Van'
console.log(person2.friends); // 'Shelby,COurt,Van'
console.log(person1.friends == person2.friends); // true

组合使用构造函数模式和原型模式

构造函数模式用来放数据，原型模式用来放方法，

// 构造函数
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Amy", "Ben"];
}

// 原型模式
Person.prototype = {
  constructor: Person,
  sayName() {
    console.log(this.name);
  },
};

const uzi = new Person("Uzi", 22, "Software Engineer");
const tom = new Person("Tom", 25, "Doctor");

uzi.friends.push("Peter");

console.log(uzi.friends); // 'Amy,Ben,Peter'
console.log(tom.friends); // 'Amy,Ben'
console.log(uzi.friends == tom.friends); // false
console.log(uzi.sayName == tom.sayName); // true

上面都是一些创建对象的方法，下面的继承才是正常要掌握的东西 */
