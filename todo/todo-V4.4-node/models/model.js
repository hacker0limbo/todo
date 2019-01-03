/**
 * 读写功能, 数据保存在 data.text 里面
 */
const fs = require('fs')
const utils = require('../utils/utils.js')
const path = require('path')

class TodoModel {
    constructor() {
        this.todoList = []
        this.dataFile = './models/data.txt'
    }

    getTodoList() {
        return this.todoList
    }

    loadTodos(callback) {
        fs.readFile(this.dataFile, 'utf8', (err, data) => {
            // readFile 路径为当前进程所在路径(process.pwd()), 而非脚本运行时所在的进程
            // 同时注意 readFile 为异步调用, 必须指定回调函数才能在读取文件以后得到或者操作数据
            if (err) {
                console.log(err);
            } else {
                this.todoList = JSON.parse(data)
                callback()
            }
        })
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
        if (this.todoList[index].isDone == '') {
            this.todoList[index].isDone = 'done'
        } else {
            this.todoList[index].isDone = ''
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
    constructor(task) {
        this.task = task
        this.time = utils.currentTime()
        this.isDone = ''
            // this.buttonDone = '完成'
            // this.isContenteditable = 'false'
    }
}

module.exports = {
    todoModel: new TodoModel(),
    TodoTaskModel: TodoTaskModel
}