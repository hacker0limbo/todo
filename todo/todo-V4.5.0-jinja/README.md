# Todo python jinja 版
运行`server.py`, 访问`localhost:3000`

## 所有路由如下
- `/`: Todo 主界面
- `/edit`: 编辑界面

## 路由作用
路由有两种, 一种就是显示界面的, 比如:
- todo_index
- todo_edit

还有一种处理客户端发过来的表单, 然后重定向, 比如:
- todo_update
- todo_delete
- todo_add

## 一些记录
- json 格式里面的 boolean 是 true 和 false, 对应 python 中的 True 和 False
- 删除只是做了一个标记, 实际还存在数据库中
- 一般使用类方法而不是静态方法, 由于类方法可以获得 cls, 静态方法和这个类无关, 是可以放到类的外面的, 比如`save()`函数