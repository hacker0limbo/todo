const model = require('../models/model.js')
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
        todoModel.loadTodos(() => {
            res.json(todoModel.getTodoList())
        })
    })


}