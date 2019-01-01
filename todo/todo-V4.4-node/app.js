const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.json())
app.use(express.static('public'))

class TodoModel {
    constructor() {
        this.todoList = []
    }

    getTodoList() {
        return this.todoList
    }

    add(todo) {
        this.todoList.push(todo)
    }

    delete(id) {
        const index = id - 1
        this.todoList.splice(index, 1)
    }

    edit(id, newTask) {
        const index = id + 1
        this.todoList[index].task = newTask
    }
}

class TodoTaskModel {
    constructor(id, task) {
        this.id = id
        this.task = task
        this.isDone = false
    }
}

const sendHtml = (path, res) => {
    const options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (err, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        res.send(data)
    })
}


const todoModel = new TodoModel()
const todoList = todoModel.getTodoList()
todoModel.add(new TodoTaskModel(1, '吃饭'))


app.get('/', (req, res) => {
    const path = './public/todo.html'
    sendHtml(path, res)
        // res.send('<h1>Hello World</h1>')
})

app.get('/todo/all', (req, res) => {
    // 这里的 todos 最好是从一个文件中读取数据
    const todos = JSON.stringify(todoList)
    res.send(todos)
})

const sendRes = function(res, todo) {
    // 用于将接受的数据转为 JSON 格式的字符串以后返回给前端
    const resData = JSON.stringify(todo)
    res.send(resData)
}

app.post('/todo/add', (req, res) => {
    const newTodo = req.body
    console.log('后端接收到的数据', newTodo)

    todoModel.add(newTodo)

    sendRes(res, newTodo)
})


const server = app.listen(3000, () => {
    console.log('访问 localhost:3000');
})

/**

路由后面都需要加上 res.send() 来返回给前端数据, 然后前端调用 .then() 方法可以获取到数据
前端和后端通信都是需要使用字符串, 因此前端发送数据需要使用 字符串, 后端返回数据也是使用 JSON 字符串

fetch('/todo/all')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('all data', data);
    })


var data = {
    id: 2,
    task: '睡觉',
    isDone: false,
}

fetch('/todo/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(res => console.log('前端接受到的数据', data))    

 */