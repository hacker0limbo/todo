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

    update(index, todo) {

        const todoCell = this._todoCells[index]

        // if (todo == null) {
        //     // no to do has been passed means todo has been delete in the model
        //     todoCell.remove()
        //     return
        // }

        if (todo.isDone == true) {
            todoCell.className = `todo-cell done`
        } else {
            todoCell.className = `todo-cell not-done`
        }

        const todoTask = todoCell.querySelector('span')
        todoTask.innerHTML = todo.task
    }

    removeTodo(index) {
        const todoCell = this._todoCells[index]
        todoCell.remove()
    }
}