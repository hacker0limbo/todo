class TodoModel {
    constructor() {
        this.todoList = []
        this.initTodos()
    }

    saveTodos() {
        const s = JSON.stringify(this.todoList)
        localStorage.todoList = s
    }

    loadTodos() {
        const s = localStorage.todoList
        return JSON.parse(s)
    }

    initTodos() {
        this.todoList = this.loadTodos()
        for (let i = 0; i < this.todoList.length; i++) {
            const todo = this.todoList[i]
            this.insertTodo(todo)
        }
    }

    addTodo(todo) {
        this.todoList.push(todo)
    }

    insertTodo(todo) {
        // 添加到 container 中
        const todoContainer = e('#id-div-container')
        const t = this.templateTodo(todo)
            // 这个方法用来添加元素更加方便, 不需要 createElement
        todoContainer.insertAdjacentHTML('beforeend', t);
    }

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


class Controller {
    constructor(todoModel) {
        this.todoModel = todoModel
    }

    bindEvent(elm, eventName, callback) {
        elm.addEventListener(eventName, (event) => {
            callback(event)
        })
    }
}


// controller
class AddButtonController extends Controller {
    constructor(todoModel) {
        super(todoModel)
        this._elm = e('#id-button-add')

        this.bindEvent(this._elm, 'click', (event) => {
            const todoInput = e('#id-input-todo')
            const task = todoInput.value

            const todo = {
                'task': task,
                'time': currentTime()
            }

            this.todoModel.addTodo(todo)
            this.todoModel.saveTodos(todo)
            this.todoModel.insertTodo(todo)
        })
    }
}


class InputBox extends Controller {
    constructor() {
        this._todoContainer = e('#id-div-container')
    }
}

class TodoApp {
    constructor() {
        const todoModel = new TodoModel()
        const addButtonController = new AddButtonController(todoModel)
    }
}


const __main = () => {
    const app = new TodoApp()
}

__main()