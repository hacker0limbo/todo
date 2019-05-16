const model = require('../models/model.js')
const utils = require('../utils/utils.js')
const todoModel = model.todoModel
const todoTaskModel = model.TodoTaskModel

module.exports = (app) => {
    app.get('/', (req, res) => {
        const options = {
            root: __dirname + '/../views/',
        }
        res.sendFile('todo.html', options)
    })

    app.get('/todo/all', (req, res) => {
        res.json(todoModel.getTodoList())
    })

    app.post('/todo/add', (req, res) => {
        // 发送形式为: {
        //     task: 'xxx'
        // }
        const newTask = req.body['task']
        const newId = todoModel.getTodoList().length + 1
        const newTodo = new todoTaskModel(newId, newTask)

        todoModel.addTodo(newTodo)

        // 写入数据文件中
        todoModel.saveTodos()
        res.json(newTodo)
    })

    app.get('/todo/delete/:id', (req, res) => {
        // delete 的问题在于删除了一个 todo 以后所有 todoid 都需要改变
        const todoId = req.params.id
        const index = todoId - 1
        const todo = todoModel.getTodo(index)

        // 错误
        todoModel.deleteTodo(index)
            // 更新 todo id
        utils.updateId(todoModel.getTodoList())
            // 写入数据文件中
        todoModel.saveTodos()
        res.json(todo)
    })

    app.post('/todo/update/:id', (req, res) => {
        // 发送形式为: {
        //     task: 'xxx'
        // }
        const todoId = req.params.id
        const index = todoId - 1
        const todo = todoModel.getTodo(index)
        const newTask = req.body['task']
        todoModel.setTodoTask(index, newTask)

        // 写入数据文件中
        todoModel.saveTodos()
        res.json(todo)
    })

    app.get('/todo/finish/:id', (req, res) => {
        const todoId = req.params.id
        const index = todoId - 1
        const todo = todoModel.getTodo(index)

        todoModel.toogleTaskDone(index)
            // 写入数据文件中
        todoModel.saveTodos()
        res.json(todo)
    })

}