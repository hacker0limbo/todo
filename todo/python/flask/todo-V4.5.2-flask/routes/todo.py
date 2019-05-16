from flask import (
    render_template,
    request,
    url_for,
    redirect,
    Blueprint,
)
from models.todo import Todo


todo_bp = Blueprint('todo', __name__)

@todo_bp.route('/')
def index():
    todo_list = Todo.query.all()
    return render_template('todo_index.html', todos=todo_list)


@todo_bp.route('/add', methods=['POST'])
def add():
    form = request.form
    t = Todo(form)
    Todo.add(t)
    return redirect(url_for('todo.index'))


@todo_bp.route('/delete/<int:todo_id>')
def delete(todo_id):
    Todo.delete(todo_id)
    return redirect(url_for('todo.index'))