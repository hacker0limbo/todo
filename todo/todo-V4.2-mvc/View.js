class TodoView {
    constructor() {}

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
}