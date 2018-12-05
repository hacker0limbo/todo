class TodoModel {
    constructor() {
        this.todoList = []
    }

    getTodoList() {
        return this.todoList
    }

    setTodoList(newTodoList) {
        this.todoList = newTodoList
    }

    setTodoTask(index, content) {
        this.todoList[index].task = content
    }
}