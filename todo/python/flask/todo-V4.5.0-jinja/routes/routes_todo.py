from models.todo import Todo
from routes import template, http_response, redirect, error


def todo_index(request):
    """
    todo 首页函数
    """
    headers = {
        'Content-Type': 'text/html',
    }
    todo_list = Todo.all()
    body = template('todo_index.html', todos=todo_list)
    return http_response(headers, body)


def todo_add(request):
    """
    用于增加 todo 的路由函数, index 页面发送的表单在这里处理
    """
    headers = {
        'Content-Type': 'text/html',
    }
    if request.method == 'POST':
        form = request.form()
        t = Todo(form)
        Todo.add(t)
    return redirect('/')


def todo_edit(request):
    """
    编辑页面显示
    """
    headers = {
        'Content-Type': 'text/html',
    }
    # 得到当前编辑的 todo 的 id
    # 此时页面的 url 含有 query ?id=1, request.query 解析为了一个字典
    todo_id = int(request.query.get('id', -1))
    if todo_id == -1:
        # 没找到, 反正错误页面
        return error(request)
    t = Todo.find_by(id=todo_id)
    body = template('todo_edit.html', todo=t)

    return http_response(headers, body)


def todo_update(request):
    """
    修改 todo 的路由函数, todo_edit 页面表单发送的数据在这个路由处理
    """
    form = request.form()
    todo_id = int(form.get('id', -1))
    todo_title = form.get('title', '')
    Todo.update(todo_id, todo_title)
    return redirect('/')


def todo_delete(request):
    """
    删除一个 todo 的路由, 这里的删除仅仅是标记 todo 数据, 在数据库里面不会真的删除
    """
    todo_id = int(request.query.get('id', -1))
    Todo.complete(todo_id, True)
    return redirect('/')


route_dict = {
    '/': todo_index,
    '/add': todo_add,
    '/edit': todo_edit,
    '/update': todo_update,
    '/delete': todo_delete,
}

