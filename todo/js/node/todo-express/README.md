# express todo

使用 express 搭建后端 api, 前端使用 fetch 获取数据

Demo: 

![demo](demo/demo.gif)

## 安装方法

```js
cd todo-V4.4-node
node app.js

// 或者使用 supervisor
supervisor app.js

// 然后访问 localhost:3000
```

## 中间件

```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
```

这里就是使用了`body-parser`这个中间件, 因此在下面的路由才可以使用`req.body`获取发送的请求数据

一个请求发送到服务器了以后, 服务器接受到请求(req), 然后处理请求, 最后返回响应(res). 其中中间件就是在发送响应之前的处理请求.

中间件本质是一个函数, 如下:

```js
const middleware = (req, res, next) => {
    // 中间件对数据的处理等
    next()
    // 将 req 和 res 控制权交给下一个中间件, 调用下一个中间件
}
```
express 内部维护一个函数数组, 叫作中间件数组, 该数组含有在发出响应之前需要执行的所有中间件函数

因此在使用`app.use(fn)`后, 传进来的 fn 就会被扔到这个数组里面, 执行完了以后调用数组里面下一个中间件


## Reference

- https://github.com/BadWaka/node-express-middleware-study
- https://xwjgo.github.io/2016/09/23/express%E7%9A%84%E4%B8%AD%E9%97%B4%E4%BB%B6/
- https://www.cnblogs.com/zhuzhenwei918/p/7452434.html
