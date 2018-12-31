# 前端路由整理

路由就是 url 到函数的映射

route 就是一条路由, 讲一个 url 路径映射成一个函数, 例如:

```js
/users => getAllusers()
/users/count => getUsersCount()
```

而用来管理路由的容器就叫作 router

## 服务端路由和客户端路由

对于服务器, 接受到客户端发送的 http 请求以后, 根据请求的 url 找到对应映射的函数, 执行该函数, 将函数的返回值返回给客户端(比如返回JSON数据)

对于客户端, 路由到映射函数通常是对于不同的路径, 显示不同的页面组件, 一共有两种方式进行路由设计, `hash` 和 `history`

## Hash 路由(#)
`#`可以做锚点, 作为跳转. **hash 值的改变不会引起页面的刷新**, 因此 hash 可以作为路由, `hashchange`事件可以监听 url 上面 # 后面是否变化并且执行相应的回调函数.

在 html 中, 在所有链接前面添加 # 可以作成软路由, 而不去触发刷新页面
```html
<a herf="#/about">about</a>
<!-- 点击这个链接 url 变成 http:www.example.com#/about 但是页面无刷新 -->
```

## History 路由

`window.history`属性指向 History 对象，History 对象保存了当前窗口访问过的所有页面网址

```js
window.history.length // 3
```

执行`history.pushState(null, '', /about)`的时候, 页面 url 会从`www.example.com`变成`www.example.com/about`. 但是页面不会刷新(可以认为此时还是`example.com`显示的内容, 尽管`/about`甚至可能不存在).

### History 对象

### window.history.pushState(state, title, url)

`History.pushState()`方法用于在历史中添加一条记录

`pushState()`方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应

```js
// 当前网址为 www.example.com
window.history.pushState(null, '', '2.html')

// 执行完该代码, 页面 url 立马变成 example.com/2.html, 但不会跳转到 2.html, 即无刷新, 2.html 不存在也没关系
```

注意:
- 调用`pushState()`方法或`replaceState()`方法不会触发`popstate`事件
- `pushState()`方法不触发任何事件, 即使添加的是一段 hash 值, 也不触发`hashchange`事件, 但是不是由该方法改变的 hash 值还是会引起 hashchange 事件

### History.replaceState()
该方法可以改变当前记录, `pushState()`用于添加新纪录

### popstate 事件
用来监听 当前 document 下的 history 对象是否发生变化

只有用户点击浏览器倒退按钮和前进按钮，
或者使用调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发该事件

### 如何根据 history 对象制作路由
对于 url 的改变, 有以下几种情况(不考虑 hash 值的改变)
- 点击浏览器的前进或者后退按钮 (通过 onpopstate 监听)
- 点击 a 标签 (通过 click 监听)
- 在 js 中触发 history.pushState()  (仅仅用来改变 url, 无法监听, 也不触发任何事件)

## Reference
- https://zhuanlan.zhihu.com/p/31874420
- https://zhuanlan.zhihu.com/p/24814675

