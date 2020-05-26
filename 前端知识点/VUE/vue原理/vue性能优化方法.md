1.路由懒加载

2.keep-alive缓存页面

3.v-show复用DOM，因为v-if会移除整个DOM

4.使用v-for的时候避免v-if

5.妙用Object.freeze()锁死不会改变的数据，不需要响应式监听

6.定时器是window的，所以不是Vue自身的属性，所以得手动清除

7.图片懒加载

8.第三方插件按需引入