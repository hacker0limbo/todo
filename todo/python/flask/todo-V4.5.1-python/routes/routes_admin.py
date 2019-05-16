from routes.routes import current_user
from models.user import User
from routes import template, redirect


def route_users(request):
    """
    只有 id 为 1 的用户可以访问这个页面(user.html), 其他用户或没登录访问会重定向到 /login
    这个页面显示了所有的用户 包括 id username password
    """
    username = current_user(request)
    u = User.find_by(username=username)
    if u is not None and u.is_admin():
        if request.method == 'GET':
            header = 'HTTP/1.1 210 OK\r\nContent-Type: text/html\r\n'
            body = template('user.html')
            users = User.all()
            users_html = ''
            for u in users:
                users_html += f'<p>id: {u.id} username: {u.username} password: {u.password}</p>'
            body = body.replace('{{users}}', users_html)
            r = header + '\r\n' + body
            return r.encode(encoding='utf-8')
    else:
        return redirect('/login')


def route_update(request):
    """
    更改密码的表单发送到这个路由, 根据 id 定位用户修改密码
    """
    form = request.form()
    user_id = int(form.get('id', -1))
    user_pwd = form.get('password', '')
    User.update(user_id, user_pwd)
    return redirect('/admin/users')


route_dict = {
    '/admin/users': route_users,
    '/admin/users/update': route_update,
}