class TodoView {
    constructor() {
        this._todoContainer = e('#id-div-container')
        this._todoCells = this._todoContainer.children
    }

    templateTodo(todo) {
        const t = `
            <div class='todo-cell not-done'>
                <button class='todo-done'></button>
                <button class='todo-delete'>删除</button>
                <button class='todo-edit'>编辑</button>
                <span class='todo-label' contenteditable=false>${todo.task}</span>
                <span>${todo.time}</span>
            </div>
        `
        return t
    }

    getTodoContainer() {
        return this._todoContainer
    }

    finishTodo(todo) {
        const index = todo.id - 1
        const todoCell = this._todoCells[index]

        if (todo.isDone == true) {
            todoCell.className = `todo-cell done`
        } else {
            todoCell.className = `todo-cell not-done`
        }

    }

    removeTodo(index) {
        const todoCell = this._todoCells[index]
        todoCell.remove()
    }

    editTodo(todo) {
        const index = todo.id - 1
        const todoCell = this._todoCells[index]
        const todoLabel = todoCell.querySelector('.todo-label')

        todoLabel.innerHTML = todo.task
    }
}