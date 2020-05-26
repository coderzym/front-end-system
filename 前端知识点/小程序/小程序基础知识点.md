一.简述微信小程序登录流程

判断用户是否登录：
    如果已经登录，那么直接调用个人信息进入个人主页
    如果没有登录，那么跳转到登录页面，调用wx.login()方法获取code，通过code去获得用户信息登录成功的话则跳转到个人主页

二.简述微信小程序支付流程

三.小程序生命周期函数

    APP生命周期：
        onLaunch：小程序初始化完成，全局只执行一次
        onShow：小程序启动时或者从后台进入前台
        onHide：小程序从前台进入后台
        onError：小程序出错的时候会执行
        onPageNotFound：当页面没有找到的时候再执行
    Pages生命周期：
        onLoad：页面被加载的时候执行，只执行一次
        onReady：页面初次被渲染时执行，也被执行一次
        onShow：页面展现时执行，可执行多次
        onHide：页面隐藏时执行，可执行多次
        onUnload：页面卸载时执行，也就是离开页面的时候执行
        执行顺序：
            onLoad => onShow => onReady => onHide

四.小程序JS环境和浏览器JS环境有什么异同
    
    小程序的JS环境是在JSCore中，没有window和document对象

1、微信小程序有几个文件

    wxml：
        标签语言，类似HTML，结合事件系统和基础组件构成页面结构
    js：
        逻辑层处理，如发送网络请求
    wxss：
        样式层处理
    json：
        小程序设置，如页面注册、页面标题和tabBar

2、微信小程序怎样跟事件传值

    设置data-*后，通过事件e.currentTarget.dataSet取值