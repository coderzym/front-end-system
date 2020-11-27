### 区别

action是用来执行异步操作，mutation是用来执行同步操作

### 为什么只能通过mutation更改state

当mutation执行的时候会将内部的开关变量_committing打开，当开关打开的时候才允许修改state内部的数据，并且当内部的同步代码执行完毕后会将_committing关闭