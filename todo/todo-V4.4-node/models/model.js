/**
 * 读写功能, 数据保存在 data.text 里面
 */
const fs = require('fs')
const utils = require('../utils/utils.js')

class TodoModel {
    constructor() {
        this.todoList = []
        this.dataFile = './models/data.txt'
        this.loadTodos()
    }

    getTodoList() {
        return this.todoList
    }

    loadTodos() {
        // 在初始化的时候同步读取数据
        const data = fs.readFileSync(this.dataFile, 'utf8')
        this.todoList = JSON.parse(data)
    }

    saveTodos() {
        const data = JSON.stringify(this.todoList)
        fs.writeFile(this.dataFile, data, 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('数据已经被写入 data.txt');
            }
        })
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
        if (this.todoList[index].isDone == false) {
            this.todoList[index].isDone = true
        } else {
            this.todoList[index].isDone = false
        }
    }

    // setButtonDone(index) {
    //     if (this.todoList[index].isDone == '') {
    //         this.todoList[index].buttonDone = '完成'
    //     } else {
    //         this.todoList[index].buttonDone = '未完成'
    //     }
    // }

    // setTaskContenteditable(index, isEditable) {
    //     this.todoList[index].isContenteditable = isEditable
    // }
}


class TodoTaskModel {
    constructor(id, task) {
        this.id = id
        this.task = task
        this.time = utils.currentTime()
        this.isDone = false
            // this.buttonDone = '完成'
            // this.isContenteditable = 'false'
    }
}

module.exports = {
    todoModel: new TodoModel(),
    TodoTaskModel: TodoTaskModel
}