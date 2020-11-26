新增语义化标签
    `nav header footer main  aside section audio video`，更好的维护性和可读性
    `script`中增加了`async`，异步加载脚本，并且加载完毕就执行
    拖拽api

cookie
    大小只有4KB，无论什么时候都会被浏览器请求头带上，然后在服务器与客户端之间来回传递

localStorage
    5MB上限，永久存储，即使关闭了浏览器，数据也存在

sessionStorage
    5MB上限，浏览器关闭就清除缓存数据也存在

indexDB
    250MB上限，受同源策略影响

doctype的作用是？
    申明文档类型，告知浏览器用W3C的标准解析该文档，如果不申明则会用怪异模式解析

href与src的区别？
    `href`
        不会阻塞浏览器解析文档，当碰到`href`会并行下载资源，比如使用`<link href>`的方式去加载css，而不是使用`@import`
    `src`
        会阻塞浏览器解析文档，直到src的资源被加载完毕才会继续解析剩下的部分

meta有哪些作用？
    charset：设置html页面的字符集
    viewport：页面视口，控制页面宽高、是否可缩放，缩放比例
    http-equiv：可模拟http请求头，可设置过期时间、缓存、刷新

viewport参数及作用？
    initial-scale，初始缩放比例，1-10
    width/height，默认宽高980px
    user-scalable，用户是否可缩放
    maximum-scale/minimum-scale，允许用户最大缩放和最小缩放的比例

http-equiv参数及作用？
    expires，设置过期时间
    refresh，定时刷新

<!doctype html>作用？
    告诉浏览器以标准模式解析文档

lang的作用？
    指定了文档的语言