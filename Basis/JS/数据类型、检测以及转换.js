/* 数据类型

JS数据类型主要分为两大类，原始数据类型和引用数据类型。其中原始数据类型是有以下几种：

1. 空值。null
2. 未定义的值。undefined
3. 布尔值。boolean
4. 字符串。string
5. 数字。number
6. 符号。symbol

引用数据类型有以下几种，常见的：

1. Object
2. Function
3. Array
4. 日期对象
5. 布尔对象
6. Number......等等

下面来逐个分析。

1. null

理解为空值、不存在的值，最直观的可以看下面代码

a => Uncaught ReferenceError: a is not defined

直接输入 a 这个变量，就被提示引用错误，a没有被定义，也就是不存在

a = null => null

把 a 赋值为null，则正常输出null，很好理解

2. undefined

理解为开辟了内存空间，但并没有赋具体的值，如下

var a => undefined

3. boolean

只有两种值，true/false

4. number

  4.1. 进制数（可略）

  这里不讨论进制数，有兴趣的可以自己下去查阅：https://juejin.cn/post/6904831751533641735

  4.2. 浮点数

  var num = 0.1 + 0.2;
  var sum = "2.3" * 100;
  console.log(num); // 0.30000000000000000004
  console.log(sum); // 229.99999999999997

  出现了精度丢失的问题，这在其他语言中也有类似的问题，我发现了一个有意思的事情，当前后两个值的倍数为2的时候，几乎必出精度丢失的问题，比如：

  0.1 + 0.2;
  0.2 + 0.4;
  3.3 + 6.6;
  10.1 + 20.2;

  由于不是我重点学习的方面，这里给个链接：https://juejin.cn/post/6844903687010123790

  4.3. 数字的范围

  这里就只需要知道Infinity和-Infinity分别表示正无穷和负无穷就好了

  4.4. NaN

  NaN全拼是Not a Number，不是一个数字。typeof NaN => 'number'

5. string

这个没啥好说的

6. symbol

用来表示唯一性，如下：

Symbol(1) == 1 // false
Symbol(1) == Symbol(1) // false

说完原始数据类型，而引用数据类型就是ES6中为我们所熟知的Class类，也就是构造函数。 */

/* 数据类型的检测

JS中有四种方法进行数据类型检测：

  1. typeof
  2. instanceof
  3. Object.prototype.toString
  4. constructor

接下来讲讲这四种检测方式，

1. typeof

typeof null => "object"
typeof 1 => "number"
typeof NaN => "number"
typeof {} => "object"
typeof [] => "object"
typeof (() => {}) => "function"

由此可见，typeof操作符的返回值类型都是string，并且无法正确的区分引用数据类型，因此常常会有人谈论引用数据类型的时候只说Function和Object

2. instanceof

它是通过对象的prototype属性来检测式子左边的值是否在右边的值的原型链上，返回值为true/false，比如，

var a = {}; a instanceof Object => true
var b = []; b instanceof Array => true
var c = 1; c instanceof Number => Uncaught SyntaxError: Unexpected identifier

由此可见，instaceof用来检测引用数据类型是很好的选择。

3. Object.prototype.toString()

它能精准地判断出值的数据类型，如下：

Object.prototype.toString.call(undefined) => "[object Undefined]"
Object.prototype.toString.call(null) => "[object Null]"
Object.prototype.toString.call(123) => "[object Number]"
Object.prototype.toString.call("123") => "[object String]"
Object.prototype.toString.call(true) => "[object Boolean]"
Object.prototype.toString.call({}) => "[object Object]"
Object.prototype.toString.call([]) => "[object Array]"
Object.prototype.toString.call((() => {})) => "[object Function]"

Array和Function作为Object的实例，它们也有toString方法，只不过都重写了，所以你可以发现下面的检测数组的方式返回的是空字符串，其他与Object相同，

Array.prototype.toString.call([]) => ""

而Function.prototype.toString只允许你传入函数，否则报错，且返回值是函数的字符串形式，

Function.prototype.toString((() => {})) => "function () { [native code] }"
Function.prototype.toString(function name() { return 1 }) => "function () { [native code] }"

4. constructor

constructor也主要是用来检测引用数据类型的方法，

var a = {}; a.constructor === Object => true

5. Array.isArray

它可以很好的检测数组类型 */

/* 数据类型转换

因为JS是门动态语言，所以在实际的操作过程中，难免会遇到类型转换的问题。主要分为两大类，显式类型转换和隐式类型转换，显示类型转换诸如，

String(123) => "123"
String(null) => "null"
Number("123") => 123
Number("a") => NaN
Number([]) => 0
Number({}) => NaN

我们主要讲隐式类型转换：

  1. 碰到逻辑运算时，转成true或者false
  2. 碰到+等算数运算符时，转成number类型
  3. 有引用数据类型参与计算的时候，优先转换右操作数的类型
  4. [].toString() = ""; {}.toString() = "[object Object]"
  5. 空数组或者空对象在前，右操作符为数字，那么不管加减符号，结果等于这个数字

通过几个题目来加深下印象，

1. 字符串的隐式转换类型

"1" + 1             // "11"
"1" + "1"           // "11"
"1" + true          // "1true"
"1" + NaN           // "NaN"，任何数和NaN相加都是NaN
"1" + []            // "1"，[].valueOf = []，[].toString() = ""，"1" + "" = "1"
"1" + {}            // "1[object Object]"，{}.valueOf = {}; {}.toString() = "[object Object]"; "1" + "[object Object]" = "1[object Object]"
"1" + function(){}  // "1function(){}"，(function(){}).valueOf() = function(){}; (function(){}).toString() = "function(){}"; "1" + "function(){}" = "1function(){}"
"1" + new Boolean() // "1false"，new Boolean() = false，"1" + new Boolean() = "1false"

2. 数字类型的隐式转换类型

1 + NaN             // NaN，任何数和NaN相加结果都是NaN
1 + "true"          // "1true"，右边是个String，所以拼接字符串
1 + true            // 2，true => 1
1 + undefined       // NaN，Number(undefined) => NaN，1 + NaN = NaN
1 + null            // 1，Number(null) => 0，1 + 0 = 1

1 + []              // "1"，[].valueOf() = [], [].toString() = "", 1 + "" = "1"
1 + [1, 2]          // "11,2"，[1, 2].valueOf() = [1, 2]，[1, 2].toString() = "1,2", 1 + "1,2" = "11,2"
1 + {}              // "1[object Object]"，{}.toString() = "[object, Object]"
1 + function(){}    // "1function(){}"
1 + Number()        // 1，Number() = 0
1 + String()        // "1"，String() = ""

[] + []             // ""，[].toString() = "", "" + "" = ""
{} + {}             // "[object Object][object Object]"，{}.toString() = "[object Object]"
{} + []             // 0，[].toString() = 0，{}被解析成了空block，也就是说这里的代码只剩下了+[]，这里的加号被解析成了正号，[].toString() = "", Number("") = 0
{a: 0} + 1          // 1，参考上面的{ a: 0 }被解析成了block，所以相当于正1，所以是1
[] + {}             // "[object Object]"，[].toString() = ""， {}.toString() = "[object Object]"
[] + !{}            // "false"，[].toString() = ""，!{} = false， "" + false = "false"
![] + []            // "false"，![] = false
'' + {}             // "[object Object]"，{}.toString() = "[object Object]"
{} + ''             // 0，'' = 0，{} + 0 = 0
[]["map"] + []      // "function map(){ [native code] }"，数组中的map方法
[]["a"] + []        // "undefined"，没有这个索引
[][[]] + []         // "undefined"，没有这个索引
+!![] + []          // 1，![] = false，!false = true, +true = +1 = 1, 1 + 0 = 1 
+!![]               // 1, 如上
1-{}                // NaN，Number({}) = NaN
1-[]                // 1, Number([]) = 0
true - 1            // 0
{} - 1              // -1, 0 - 1 = -1
[] !== []           // true，对象不等于自己
[]['push'](1)       // 1，调用了push方法，push方法返回当前push的值，所以是1

(![]+[])[+[]]       // "f"，先运算括号里面的，(![]+[]) = "false", [+[]] = [0], "false"[0] = "f"
(![]+[])[+!![]]     // "a"，同上，[+!![]], !![] = true = 1，"false"[1] = "a" */

/* 经典面试题，如何让(a == 1) && (a == 2) && (a == 3) 等于 true？

改写valueOf:

const a = {
  num: 0,
  valueOf() {
    return ++this.num;
  },
};

改写toString：

const num = 0;
Function.prototype.toString = function () {
  return ++num;
};
function a() {}

改写ES6中的ToPrimitive方法：

const a = {
  [Symbol.toPrimitive]: (function (i) {
    return function () {
      return ++i;
    };
  })(0),
}; 

数组的toString方法默认会使用数组的join方法：

const a = [1,2,3]
a.join = a.shift()

这样一来，进行对比的时候，就会a.toString方法也就调用的是a.shift方法，就会弹出第一个值。 */
