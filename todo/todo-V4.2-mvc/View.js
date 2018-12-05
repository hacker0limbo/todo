class TodoView {
    constructor() {}

    templateTodo(todo) {
        const t = `
            <div class='todo-cell'>
                <button class='todo-done'>完成</button>
                <button class='todo-delete'>删除</button>
                <button class='todo-edit'>编辑</button>
                <span class='todo-label' contenteditable='false'>${todo.task}</span>
                <span>${todo.time}</span>
            </div>
        `
        return t
    }
}