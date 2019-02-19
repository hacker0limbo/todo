# note13
flask 的一些笔记

## flask shell 

由于我使用 conda 作为包管理器, 需要先激活环境, 再启用 flask shell, 否则会显示 ModuleNotFoundError: No module named 'flask_sqlalchemy'

```python
source activate [环境]
(环境) $ flask shell

```

## 初始化 App 和 db

`db.create_all()` 只创建不存在的表, `db.drop_all()`删除数据, 表还是存在

## endpoint 端点
flask 中 映射为: URL -> 端点(endpoint) -> 视图函数, 通常端点名和视图函数一样, 比如:

```python
@app.route('/greeting/<name>', endpoint='give_greeting')
def give_greeting(name):
    return 'Hello, {0}!'.format(name)

# 由于默认端点和视图函数式一样的, 这里可以不写 endpoint
# add_url_rule 可以做同样的工作, 参数依次为: 路径, 端点, 视图函数, 如下
def give_greeting(name):
    return 'Hello, {0}!'.format(name)

app.add_url_rule('/greeting/<name>', 'give_greeting', give_greeting)

# 即端点可以连接 URL 和视图函数, 比如 url_for(endpoint, **args)
url_for('give_greeting', name='Mike') # => /greeting/Mike

```

端点可以和蓝本一起使用, 对于同一路径但是不同的前缀名, 端点可以正确识别到路由函数上, 比如有两个蓝本, 如下:

```python
admin = Blueprint('admin', __name__)

@admin.route('/greeting')
def greeting():
    return 'Hello, administrative user!'


user = Blueprint('user', __name__)
@user.route('/greeting')
def greeting():
    return 'Hello, lowly normal user!'

```
如果这里想用`url_for`函数, 如果不使用端点, 直接传入视图函数名, 比如这样: `url_for(greeting)`, 无法分辨出是哪个路由该执行`greeting`函数, 因此使用蓝本 + 端点可以防止命名空间的重复:

```python
print url_for('admin.greeting') # Prints '/admin/greeting'
print url_for('user.greeting') # Prints '/user/greeting'
```


## 蓝图

- 蓝图可以管理视图(路由), 不同的路由有不同的功能, 比如`/api`下面的表示 api. 
- 一个蓝图有自己的静态文件, 模板, 过滤器等
- 蓝图可以为路由提供前缀

创建并注册蓝图:
```python
page_bp = Blueprint('page', __name__,
                        template_folder='templates')

from app.simple_page import simple_page
app.register_blueprint(page_bp)
```
注意在构建的时候, 会把`Blueprint`里面的第一个参数作为蓝图名字(这里为`page`), 作为函数端点的前缀, 比如`url_for(page.xxx)`


## 使用静态文件

目录如下:

`index.html`需要有引用`main.css`
```
static/
    css/
        main.css
templates/
    index.html
app.py
```

Flask 自动添加一个 static 视图，视图使用相对于 flask/static 的相对路径


```html
<link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='css/main.css') }}">
<!-- 等同于下面 -->
<link rel="stylesheet" type="text/css" href="static/css/main.css">
```

## Reference
- https://stackoverflow.com/questions/16351826/link-to-flask-static-files-with-url-for
- https://www.jianshu.com/p/808917d76b51

- https://stackoverflow.com/questions/34807235/why-sqlalchemy-create-all-can-be-reused(`create_all()`)