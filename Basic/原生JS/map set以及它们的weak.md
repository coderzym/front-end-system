Set数据结构
    基本介绍
        1.没有重复的值
        2.添加值的时候并不会进行类型转换，如NaN在Set内部是相等的
        3.Set内部的只有值，没有键，或者说，键和值都相等
    
    常用API
        Set.prototype.keys
        Set.prototype.values
        Set.prototype.entries
        Set.prototype.forEach
        Set.prototype.clear
        Set.prototype.delete
        Set.prototype.has
        Set.prototype.size
        同样也可以使用...扩展运算符和for of，从而它也可以间接的使用map filter

WeakSet数据结构
    和Set有三个区别
        1.成员值只能是对象类型
        2.弱引用，可能随时会消失，且不能够被遍历，所以它更适合放临时需要存放的值
        3.Set支持定义的时候传入成员，WeakSet不支持

Map数据结构
    本质上是一个可以将对象作为键名的Object，传统上的Object只能用字符串来当键名，Map则是可以让对象与对象，数组与数组完成一个映射关系，可以理解为更完善的Hash结构

    常用的API，几乎与Set无异
        set
        get
        has
        delete
        ......

    注意点：
        1.只有同一个引用地址，才会视为同一个键，所以比对的是内存地址
        2.0 -0是同一个键，NaN和NaN是同一个键
        3.undefined和null不是同一个键
        4.可以链式调用

WeakMap数据结构

    和WeakSet类似，与Map有两点不同
    1.只接受对象类型为键名
    2.它所引用的对象的其他引用被清除，就会自动消失，不会等GC回收
