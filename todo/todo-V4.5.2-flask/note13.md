# note13

## 蓝图

- 蓝图可以管理视图(路由), 不同的路由有不同的功能, 比如`/api`下面的表示 api. 
- 一个蓝图有自己的静态文件, 模板, 过滤器等
- 蓝图可以为路由提供前缀

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
-https://stackoverflow.com/questions/16351826/link-to-flask-static-files-with-url-for