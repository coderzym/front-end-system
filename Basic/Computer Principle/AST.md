# 使用场景

1.babel-loader：es6 => es5
2.css预处理器
3.eslint
4.ts => js
5.代码压缩

# 标准的AST工具

1.scanner解析原始代码生成tokens(字符流)
2.parser解析tokens生成AST树(JSON树)
3.traverse对AST树进行遍历增删改查
4.generator将修改后的AST树转成代码

# V8

1.scanner解析原始代码生成tokens(字符流)
2.parser解析tokens生成AST树(JSON树)并优化
3.通过Ignition解释器生成字节码(减小最终代码的体积)

# 简单总结

scanner主要是对我们输入的JS代码进行分割，形成一个tokens流，可以理解为JSON对象，标准的AST解析器和V8解析器两者有很大的区别。V8的AST解析只是为了速度而生，如果声明了一个函数但不调用，那么V8根本就不会管，而标准的AST解析器还是会老老实实的解析出来，如果调用了，那么V8单独为这个函数生成了一个新的AST树，不再走Ignition的流程，而标准的AST解析器还是会走一遍generator的流程

所以我认为标准的AST工具只是起到了一个规范的作用，实际上每个框架都会自己写一套AST或者选用优化过的AST

# 词法分析

将我们的代码读取，按照预定的规则合并成一个个的标识tokens，同时会移除空白符、注释等。最后将这些tokens合并成一个一维数组

# 语法分析

将一维数组转化成一个类似于树的结构，在这个过程中如果有语法错误，那么就会报错