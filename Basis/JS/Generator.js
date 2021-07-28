/* Generator也就是生成器意思，可以理解为一个状态机，内部封装了很多状态，执行 Generator 函数会返回一个遍历器对象，有没有联想到Iterator
形式上，Generator 函数是一个普通函数，但是有两个特征
function 关键字与函数名之间有一个星号（*）
函数体内部使用 yield（中文 生产/产出 的意思）表单式，定义不同的内部状态
function* helloWorldGenerator() {
  yield 'Hello';
  yield 'World';
  return 'Ending';
}
const hw = helloWorldGenerator(); */

/* 理解协程
传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做 协程（coroutine），意思是多个线程互相协作，完成异步任务。
协程有点像函数，又有点像线程。它的运行流程大致如下。
  1. 第一步，协程 A 开始执行。
  2. 第二步，协程 A 执行到一半，进入暂停，执行权转移到协程 B。
  3. 第三步，（一段时间后）协程 B 交还执行权。
  4. 第四步，协程 A 恢复执行。
上面流程的协程 A，就是异步任务，因为它分成两段（或多段）执行。 */

/* 如何使用 Generator 函数，执行一个真实的异步任务 */
function* gen() {
  var url = "https://api.github.com/users/github";
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();
console.log(result);
result.value.then(res => {
  // doSomething
  console.log("res", res);
});
