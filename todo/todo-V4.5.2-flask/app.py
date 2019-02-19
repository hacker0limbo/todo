from flask import (
    Flask,
)
import os
from utils import random_str
from models import db
from models.todo import Todo
from routes.todo import todo_bp as todo_routes


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + os.path.join(app.root_path, 'db', 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = random_str()

db.init_app(app)

# url_prefix 可以给路由增加一个前缀
app.register_blueprint(todo_routes, url_prefix='/todo')


if __name__ == '__main__':
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=2000,
    )
    app.run(**config)
