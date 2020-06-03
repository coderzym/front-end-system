// 关于块级作用域的有意思的扩展

{
    try {
        throw undefined;
    } catch (a) {
        a = 2;
        console.log(a);
    }
}
console.log(a);