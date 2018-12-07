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

    // 根据 model 更新视图
    update(index, todo) {
        const todoCell = this._todoCells[index]
        todoCell.className = `todo-cell ${todo.isDone}`

        const todoDone = todoCell.querySelector('.todo-done')
        todoDone.innerHTML = todo.buttonDone

        // 同理 更新 task
        const todoTask = todoCell.querySelector('span')
        todoTask.innerHTML = todo.task
    }
}