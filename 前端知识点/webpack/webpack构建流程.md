# webpack配置流程

1.从配置文件和shell语句中读取和合并参数，得出最终的配置参数

2.用配置参数初始化Compiler对象，为webpack事件流挂载自定义的hooks

3.判断options中是否启动了watch模式，如果是，则执行watch方法构建，否则执行run方法构建

4.通过配置的entry，遍历所有的入口文件，创建Compilation对象回调compilation相关的钩子，调用所有配置的loader，从右向左递归编译匹配到的文件(从右向左是原因是webpack选择了函数式编程的实现方式，并不是因为技术上有实现难度)

5.通过Compilation对象我们可以获得当前模块资源、编译生成的资源以及修改的文件。将编译好的文件内容生成AST，然后递归这个过程，直到所有模块都被处理过，调用compilation.seal方法进行整理、优化和封装，最后得到最终内容

6.我们可以通过compilation.assets访问这些最终内容

# 这里得做一个补充

compile和compilation(这2个是回调函数)

    compile：新的编译创建后执行
    compilation：每次编译都会执行

Compiler和Compilation(这2个是对象)

    Compiler：包含了webpack的所有环境配置，可以理解为webpack实例
    Compilation：Compilation包含了当前的模块资源、编译生成资源和变化文件等，每当一个文件修改时，都会新生成一个Compilation对象，它本身也提供了很多事件回调插件做扩展，我们可以通过Compilation访问Compiler