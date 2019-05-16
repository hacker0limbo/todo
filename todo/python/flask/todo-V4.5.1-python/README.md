# Todo python 版
运行`server.py`, 访问`localhost:3000`

## 路由
- `/` 主页面
- `/login` 登录页面
- `/register`注册页面
- `profile` 个人主页
- `todo` 个人的 todo
- `/admin/users` 所有用户的账号信息(需要管理员登录)

更多的路由在`routes`目录下面

### user
1. 使用`cookie`管理账号密码, 第一次登录以后自动在浏览器里面保存`cookie`, 以后访问主页面自动登录
2. 使用`session`对用户账号加密
3. 管理员(role=1) 可以查看和管理所有账号和密码

### todo
1. 不同的用户有各自的 todo, 只有登录了才能查看自己的 todo, 否则访问`/todo`会被重定向到`/login`. 自己的 todo 可以进行管理(增加, 删除), 与其他用户的 todo 不冲突
 