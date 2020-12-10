// 让一个对象来代理做其他事情

const bitch = {
    skin: 'white',
    mimi: 'D',
    skill: 'wonderful',
    price: 2000,
    pay: '我想白嫖'
}

let agent = new Proxy(bitch, {
    get(obj) {
        if (obj.pay === '我白嫖') {
            console.log('你个垃圾')
        }
    },
    set(obj, k, v) {
        console.log('修改bitch信息成功')
    }
})