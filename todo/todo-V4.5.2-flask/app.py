from flask import (
    Flask,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Blueprint,
)
from utils import random_str
from routes.todo import todo as todo_routes


app = Flask(__name__)

app.secret_key = random_str()

# url_prefix 可以给路由增加一个前缀
app.register_blueprint(todo_routes, url_prefix='/todo')

if __name__ == '__main__':
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=2000,
    )
    app.run(**config)
