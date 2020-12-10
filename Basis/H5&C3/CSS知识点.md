# 介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？

标准盒模型宽度=内容宽度(content) + padding + border + margin
低版本IE宽度=内容宽度(content + padding + border) + margin

# box-sizing属性？

控制盒子模型的解析模式，默认为content-box
content-box：W3C的标准盒模型。设置元素的width/height属性指的是content部分的宽高
border-box：IE传统盒模型。设置元素的width/height属性指的是border + content + padding

# css选择器有哪些？哪些属性可以继承？

id选择器
class选择器
标签选择器(div a button)
属性选择器(a[href='#'])
伪类选择器(a:active nth-child() nth-of-type() nth-last-child())
后代选择器(li a)
子代选择器(li>a)
通配符选择器(*)
相邻选择器(+ ~) 加号代表紧挨着的，~代表所有的兄弟元素

可继承的属性：color font-size width(块级元素) font-family
不可继承的属性：padding margin border height

# CSS优先级算法如何计算？

优先级相等时，选择最近的样式，继承来的样式优先级最低

!important 最高
内联 1000
id 100
class/伪类 10
元素 1

# CSS3新增伪类有那些？

p:nth-child(1) 父元素下的第一个元素必须为p元素才生效
p:first-child 父元素下的第一个元素必须为p元素才生效
p:nth-of-type(1) 父元素下第一个类型是p的元素
p:nth-last-child(1) 父元素下的最后一个元素必须为p元素才生效
:checked 按钮是否选中
:disabled 禁用按钮
:enabled 启用按钮

# display有哪些值？说明他们的作用？

none：隐藏元素，DOM节点也删除
block：以块级元素显示
inline-block：以行内块级元素显示，既可以像块级元素设置宽高，也可以排列在一行
inline：以行内元素显示
inherit: 继承父元素的显示方式
flex：以弹性盒子显示
inline-flex：以行内弹性盒子显示

# position的值？

absolute：相对于第一个值为absolute或relative的父元素定位，脱离文档流
relative：相对定位，不脱离文档流，即使设置left值，原来的位置也被保存
static：默认
fixed：固定定位，相对于浏览器可视窗口定位，脱离文档流
sticky：粘性定位。可以理解为relative和fixed的结合，只在父元素内生效，具有一个吸附的效果，必须配合top/left/right/bottom中的某个属性一起使用，当父级视口不见时，position被设置为sticky的元素属性值会更改为fixed，当父级视口可见时，会变为relative

# CSS3有哪些新特性？

box-shadow：盒子阴影
border-radius：圆角
opacity：透明度
@media：媒体查询
css动画：animation设置@keyframe
word-wrap：文字换行
transform
flex
text-shadow

# 请解释一下CSS3的flexBox(弹性盒布局模型)，以及适用场景？

设置父元素为flex后，父元素被称之为容器，子元素是项目，项目会按照容器设置的flex属性排列，同时子元素的float、clear和vertical-align都失效，flex-direction规定容器的主轴

justify-content规定项目主轴的排列方式，属性值有space-between、space-around、center、start、end

align-items规定项目在交叉轴上的排列方式，属性值有start、center、end，

align-content和justify-content属性值差不多

flex属性是一个复合值，flex-grow、flex-shrink、flex-basis，可选值有 0 1 auto

# 为什么要初始化CSS样式？

为了防止不同的浏览器对于不同的标签默认值的差异导致页面不统一，所以需要初始化样式

# display:none与visibility：hidden的区别？

display:none会引起浏览器的回流+重绘，因为它删除的DOM元素
visibility：hidden会引起浏览器的重绘，它没有删除DOM元素，只是隐藏了样式

# position跟display、overflow、float这些特性相互叠加后会怎么样？

position：absolute/fixed优先级最高，其他的就按设置的属性规则排列

# 对BFC规范(块级格式化上下文：block formatting context)的理解？

BFC是一种页面布局规则，也叫块级格式化上下文，形成BFC的区域中，排列规则为：

1.盒子元素垂直排列
2.子元素不与float盒子重叠
3.内部和外部的元素排列互不影响
4.浮动元素也参与计算高度
5.两个盒子之间的margin会发生重叠，所以设置较大的margin值即可

触发BFC的条件是：

1.根元素，如body
2.position：absolute/fixed
3.float不为none
4.overflow不为visible
5.display为inline-block、table-cell以及table-caption

BFC影响？

1.同一个BFC中，相邻的两个元素边距会重叠在一起
2.浮动元素无法撑起父元素，必须设置高度，也就是margin合并
3.浮动元素不会和BFC元素重叠
4.容器内的元素不会影响到容器外的元素

# 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

当使用float的时候就会出现浮动，如果不清楚浮动，那么就会影响后面元素的排列，清除浮动最好的方式是给伪元素设置属性，
content：''
display: block
clear: both

# 上下margin重合的问题

1.设置较大的那个margin值
2.设置overflow：hidden等可以触发BFC规则的属性

# 设置元素浮动后，该元素的display值是多少？

设置float的元素会被自动转成block元素

# CSS优化、提高性能的方法有哪些？

1.避免不必要的命名
2.避免使用!important
3.避免后代选择器，尽量使用子代
4.避免不必要的重复
5.尽量精简规则
6.尽量合并抽离相同的样式

# 浏览器是怎样解析CSS选择器的？

浏览器是从右向左进行解析，如果是从左向右的话将会浪费很多性能在查找失败上，因为浏览器需要遍历从根节点开始去遍历每一个可能是目标节点的DOM节点，如果失败就得重新来过。而从右向左可以提前筛选掉不符合的节点

# margin和padding分别适合什么场景使用？

内容与边框有距离的时候用padding，元素与元素间有距离时，用margin

# 元素竖向的百分比设定是相对于容器的高度吗？

相对于父容器的高度，即使是padding-top/bottom margin-top/bottom也一样

# 双冒号和单冒号有什么区别？

双冒号是指伪元素，不存在于DOM中，只存在于页面中，单冒号是指伪类，更像是表示一种状态

# 你对line-height是如何理解的？

line-height是指多行文本之间基线的距离，单行文本中line-height = height，会实现文本居中，此时即使删除了height属性也无碍

# style标签写在body后与body前有什么区别？

浏览器是自上而下解析HTML文档，如果style标签写在body后面，那么最后渲染样式表时，可能会引起页面的重绘和重排

# 阐述一下CSS Sprites

将一个页面中要用的所有图片都放到一张大图中，然后使用bgc-position属性，减少了HTTP请求次数，极大的提高了页面的性能

# 层叠等级

background/border => z-index < 0 => block => float => inline-block => z-index =0 /auto => z-index > 0

# flex:1的含义

让所有弹性盒模型对象的子元素都有相同的长度，忽略它们内部的内容

# 为什么 list-item 元素会出现项目符号？

本来只有块级盒子和内联盒子，但为了解决盒子展示序号的问题，list-item就出现，它会另外生成一个名为“附加盒子”来存放项目序号，所以实际上除了块级盒子、内联盒子还有个标记盒子

# CSS中元素的盒子

其实每个元素是有两个盒子的，一个是外在盒子，一个是内在盒子，也叫容器盒子，display改变的其实就是外在盒子。两个盒子各司其职，外在盒子负责一行显示还是多行显示，内在盒子负责宽高、内容呈现等内容，因此如果是display: block的话，我们可以幻想写成display: block-block的形式，更加方便理解

# 流动性丢失

这是一个比较重要的概念，块级元素被设置宽度后就不会铺满外在盒子，甚至可能会超过外在盒子的宽度

# 宽度分离原则

将宽度尽量设置在父元素上，子元素不设置，后续有宽度上更改的话，直接利用padding和margin对子元素进行操作即可，更好的维护性。宽度分离可能会多一层嵌套，但收益极大，就犹如虚拟DOM一样。另外不要强行使用宽度分离

# 为什么说最好不要使用 * { box-sizing: border-box } ？

这个属性最初发明只是为了解决替换元素如img input video等内部元素宽度100%无法自适应父容器宽度的问题。而且即使设置了display也无用，所以需要设置它

# position 高度的计算会带上 padding 值

# max-width/min-width 会无视 !important ， min/max-height 同理

# vertical-align ，对于非替换元素来讲，默认值为baseline，也就是x字符的底部，但对于替换元素来讲，baseline是在元素的底部

# 有意思的是在Firefox浏览器下，如果把img标签中的src属性去掉，那么它和span没任何区别，在Chrome下，条件是img中存在不为空的alt属性

# padding 相对于 width 进行计算

# 说说 margin: auto 的规则？

这里分为两种情况，如果一侧为定值，那么auto占据剩余空间；如果都是auto，那么就会平分

# 为什么 border-width 不支持百分比？

为了防止屏幕变大， border-width 也跟着变大，所以没有这样设计

# 为什么 line-height 可以让内联元素垂直居中？

原因是CSS的行距上下等分机制，实际上line-height等于height也只是近似垂直居中，文字会向下偏移1px-2px的距离，但并不容易察觉

# 为什么inline-block有间距？怎么去除？

归根结底这是一个西文排版的问题，它实际上是一个行内（inline）的问题，它由空格、换行或回车所产生空白符所致

可以使用设置float或者font-size：0

# relative相对于谁定位

相对于自身在普通文档流中的位置定位

# 普通文档流是个怎样的层级关系

将窗体自上而下分成一行一行,并在每行中按从左至右的挨次排放元素