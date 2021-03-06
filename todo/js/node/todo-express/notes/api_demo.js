const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static('public'))

const model = require('./model.js')
const TODOS = model.TODOS

const updateId = () => {
    for (let i = 0; i < TODOS.length; i++) {
        const todo = TODOS[i]
        todo['id'] = i + 1
    }
}

app.get('/', (req, res) => {
    const options = {
        root: __dirname + '/public/',
    }
    res.sendFile('index.html', options)
})

app.get('/todo/all', (req, res) => {
    res.json(TODOS)
})

app.post('/todo/add', (req, res) => {
    // 发送形式为: {
    //     task: 'xxx'
    // }
    const newTask = req.body['task']
    const newTodo = {
        id: TODOS.length + 1,
        task: newTask,
        idDone: false
    }

    TODOS.push(newTodo)
    res.json(newTodo)
})

app.get('/todo/delete/:id', (req, res) => {
    // delete 的问题在于删除了一个 todo 以后所有 todoid 都需要改变
    const todoId = req.params.id
    const index = todoId - 1
    const todo = TODOS[index]
    TODOS.splice(index, 1)
    updateId()
    res.json(todo)
})

app.post('/todo/update/:id', (req, res) => {
    // 发送形式为: {
    //     task: 'xxx'
    // }
    const todoId = req.params.id
    const index = todoId - 1
    const todo = TODOS[index]
    const newTask = req.body['task']
    todo['task'] = newTask
    res.json(todo)
})

const server = app.listen(2000, () => {
    console.log('访问 localhost:2000');
})