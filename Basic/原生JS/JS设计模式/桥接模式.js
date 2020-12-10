// 改写getCatById 将抽象与现实完全隔离，抽象完全依赖传参，同时我们在别的地方也可以引用，不受制与业务
var getCatById = function (id, callback) {
    asyncRequst('Get', `cat.url?id=${id}`, function (resp) {
        console.log('我已经获取了信息')
    })
}

// 修改桥接模式后
element.addEventListener('click', getCatByIdBridge)
var getCatByIdBridge = function (e) { // getCatByIdBridge 桥接元素
    getCatById(this.id, function (cat) {
        console.log('request cat')
    })
}
