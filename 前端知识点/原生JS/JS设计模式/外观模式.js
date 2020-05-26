// 意思是将每个函数的功能分离开，入口函数中执行其他函数，所以只需要执行入口函数即可，这个入口函数可以被理解为门面函数

function YaSuo() {
}
function Qskill(hero) {
    hero.prototype.Qskill = function () {
        console.log('hasaki!!')
    }
}
function Wskill(hero) {
    hero.prototype.Wskill = function () {
        console.log('风墙')
    }
}
function Eskill(hero) {
    hero.prototype.Eskill = function () {
        console.log('快乐')
    }
}
function Rskill(hero) {
    hero.prototype.Rskill = function () {
        console.log('痛里唉该痛')
    }
}
function Skin(hero, skin) {
    hero.prototype.skin = skin
}

function CreateYasuo() {
    Qskill(YaSuo)
    Wskill(YaSuo)
    Eskill(YaSuo)
    Rskill(YaSuo)
    Skin(YaSuo, 'originSkin')
    return new YaSuo()
}
CreateYasuo()
// 创建成功 外观模式启动