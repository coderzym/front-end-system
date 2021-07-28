/* 只要部署了Iterator接口的数据接口都可以进行迭代
    目前已经内置Iterator原生数据结构有
    Array
    Map
    Set
    String
    TypedArray
    函数的 arguments 对象
    NodeList 对象
*/
let myIterable = {
  name: "zym",
  gender: "m",
  age: 24,
  [Symbol.iterator]() {
    let len = Object.keys(myIterable).length;
    let index = 0;
    return {
      next() {
        return index >= len
          ? {
              done: true,
              value: undefined,
            }
          : {
              done: false,
              value: myIterable[Object.keys(myIterable)[index++]],
            };
      },
    };
  },
};

for (const value of myIterable) {
  console.log(value);
}

// 如何才将for...of改写成for...in呢
const arr = ["a", "b", "c", "d", "e"];
const myIterator = arr[Symbol.iterator]();
let func;

for (; (func = myIterator.next()) && !func.done; ) {
  console.log(func.value);
}
