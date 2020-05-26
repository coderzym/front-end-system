class EventEmeitter {
    constructor() {
        this._events = this._events || new Map(); // 储存事件/回调键值对
        this._maxListeners = this._maxListeners || 10; // 设立监听上限
    }
    emit(type, ...args) {
        let handler;
        // 从储存事件键值对的this._events中获取对应事件回调函数
        handler = this._events.get(type);
        args.length > 0 ? handler.apply(this, args) : handler.call(this)
        return true;
    }
    addListener(type, fn) {
        if (!this._events.get(type)) {
            this._events.set(type, fn);
        }
    }
}