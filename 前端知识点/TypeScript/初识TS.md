### 简单的申明变量

```js
    // 申明基本数据类型的变量，其他基本数据类型同理
    let num: number = 1

    // 申明数组
    let arr: string[] = ["1", "11", "111"]

    // 申明对象，如果不对申明的注解进行赋值操作，直接打印对象a的结果是undefined
    let a: {
        b: string,
        c: string,
        d: {
            e: string[],
            f: number
        }
    } = {
        b: "string",
        c: "string",
        d: {
            e: ["1"],
            f: 1
        }
    }

    // 但目前推荐创建接口的形式去更好的复用
    interface a {
        b: string,
        c: string,
        d: {
            e: string[],
            f: number
        }
    } 

    let cm: a = {
        b: "string",
        c: "string",
        d: {
            e: ["1"],
            f: 1
        }
    }

    console.log(cm);

    // 还可以定义对象中函数的返回值类型
    f: () => void // 没有返回值
    f: () => number // 返回number类型，其他基本数据类型同理

    // 申明函数的形参以及返回值
    function sing(person1: string, person2: string): string { return "string" }

    // 接收返回值
    let str: string = sing("a", "b")
```