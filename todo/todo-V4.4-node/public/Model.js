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

    getTodo(index) {
        return this.todoList[index]
    }

    setTodoTask(index, content) {
        this.todoList[index].task = content
    }

    addTodo(todo) {
        this.todoList.push(todo)
    }

    deleteTodo(index) {
        this.todoList.splice(index, 1)
    }

    toogleTaskDone(index) {
        if (this.todoList[index].isDone == '') {
            this.todoList[index].isDone = 'done'
        } else {
            this.todoList[index].isDone = ''
        }
    }

    setButtonDone(index) {
        if (this.todoList[index].isDone == '') {
            this.todoList[index].buttonDone = '完成'
        } else {
            this.todoList[index].buttonDone = '未完成'
        }
    }

    setTaskContenteditable(index, isEditable) {
        this.todoList[index].isContenteditable = isEditable
    }
}


class TodoTaskModel {
    constructor(task) {
        this.task = task
        this.time = currentTime()
        this.isDone = ''
        this.buttonDone = '完成'
        this.isContenteditable = 'false'
    }
}