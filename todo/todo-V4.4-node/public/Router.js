class Router {
    constructor() {
        // routes 用来存放不同路由对应的回调函数
        this.routes = {};
        this.currentUrl = '';
        this.init()
    }

    route(path, callback) {
        this.routes[path] = callback
    }

    updateView() {
        this.currentUrl = location.hash.slice(1)
        if (this.routes[this.currentUrl]) {
            this.routes[this.currentUrl]()
        }
    }

    init() {
        // init 用来初始化路由，在 load 事件发生后刷新页面，并且绑定 hashchange 事件，当 hash 值改变时触发对应回调函数
        window.addEventListener('load', (event) => {
            this.updateView()
        })

        window.addEventListener('hashchange', (event) => {
            // hashchange 用来监听 url 上面 # 后面是否发生了变化
            this.updateView()
        })
    }
}