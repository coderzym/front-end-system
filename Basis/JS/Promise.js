/* Promise描述
1. 使用需要传入executor函数，一旦异步操作完成，那么就会改变状态且无法再次修改
2. 一旦创建执行，无法中途取消
3. 处于pending状态时不知道具体目前是哪个阶段

Promise静态方法
1. Promise.race(): 将多个 Promise 实例包装成一个新的 Promise 实例。某个成员状态变更后触发回调
2. Promise.all(): 将多个 Promise 实例包装成一个新的 Promise 实例。全部成员 Fulfilled 或某个成员 Rejected 时触发回调
3. Promise.resolve(): 返回新的 Promise 实例，该实例的状态为 Fulfilled
4. Promise.reject(): 返回新的 Promise 实例，该实例的状态为 Rejected
5. Promise.allSettled(): 您总是想知道每个 Promise 的结果时，通常使用它
6. Promise.any(): 当你只关系Promise改变状态的时候，不管是Fulfilled还是Rejected，你就可以使用它

Promise原型方法
1. Promise.then(): 添加 fulfillment 和 rejection 回调到当前 Promise，返回一个新的 Promise，将以回调的返回值来 resolve
2. Promise.catch(): 相当于 .then(null, rejection)，用于指定发生错误时的回调函数
3. Promise.finally(): 用于指定无论 Promise 对象最后状态如何，都会执行的操作 */

/* 如何让Promise多任务串行呢？傻逼才会说Promise.all方法，因为Promise.all是并发的 */

/* 例子: */

const Task = function (result, isSuccess = true) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      }, 1000);
    });
};

execute([Task("A"), Task("B"), Task("C", false), Task("D")]).then(resultList => {
  console.log(resultList);
});

function execute(tasks) {
  /* 需要等到全部Promise返回后，再打印最终的结果
  reduce方法需要传入一个处理函数以及默认值 */
  return tasks.reduce(
    (prePromise, curPromise) =>
      /* 这里的resultArr实际上就是Promise.resolve([])的返回值，也就是[] */
      prePromise.then(resultArr => {
        /* Promise中的then方法需要返回给下一个promise实例使用，执行逻辑是：
        1. 先等待上一个的promise函数返回结果，然后在then方法里返回一个新的Promise对象
        2. 在这个新的Promise对象中调用当前的promise函数，并把结果都放在数组中
        问：为什么要返回一个新的Promise对象
        答：因为reduce的默认值是一个Promise.resolve([]), 所以我们每次的返回结果都得是一个Promise对象
        Loop 1 =>
        prePromise = Promise.resolve([])
        curPromise = Task("A") = new Promise((resolve, reject) => setTimeout(() => {}, 1000));
        Loop 2 =>
        prePromise = new Promise(resolve => curPromise())
        curPromise = Task("B") = new Promise((resolve, reject) => setTimeout(() => {}, 1000)); */
        return new Promise(resolve => {
          curPromise()
            .then(value => {
              resolve(resultArr.concat(value));
            })
            .catch(() => {
              resolve(resultArr.concat(null));
            });
        });
      }),
    Promise.resolve([]),
  );
}
