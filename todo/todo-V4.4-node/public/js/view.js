class TodoView {
    constructor() {
        this._todoContainer = e('#id-div-container')
        this._todoCells = this._todoContainer.children
    }

    templateTodo(todo) {
        const t = `
            <div class="todo-cell ${todo.isDone ? 'done' : 'not-done'}">
                <input type="checkbox" class="todo-done" ${todo.isDone ? 'checked' : ''}></input>
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
        const checkBox = todoCell.querySelector('.todo-done')

        if (todo.isDone == true) {
            todoCell.className = `todo-cell done`
            checkBox.checked = true
        } else {
            todoCell.className = `todo-cell not-done`
            checkBox.checked = false
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