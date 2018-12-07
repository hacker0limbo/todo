class TodoView {
    constructor() {
        this._todoContainer = e('#id-div-container')
        this._todoCells = this._todoContainer.children
    }

    templateTodo(todo) {
        const t = `
            <div class='todo-cell ${todo.isDone}'>
                <button class='todo-done'>${todo.buttonDone}</button>
                <button class='todo-delete'>删除</button>
                <button class='todo-edit'>编辑</button>
                <span class='todo-label' contenteditable='false'>${todo.task}</span>
                <span>${todo.time}</span>
            </div>
        `
        return t
    }

    getTodoContainer() {
        return this._todoContainer
    }

    update(index, todo) {
        const todoCell = this._todoCells[index]
        todoCell.className = `todo-cell ${todo.isDone}`

        const todoDone = todoCell.querySelector('.todo-done')
        todoDone.innerHTML = todo.buttonDone

        const todoTask = todoCell.querySelector('span')
        todoTask.innerHTML = todo.task
    }

    removeTodoCell(todoCell) {
        todoCell.remove()
    }
}