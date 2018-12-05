class TodoController {
    constructor(todoModel, todoView) {
        this.todoModel = todoModel
        this.todoView = todoView
    }

    bindEvent(elm, eventName, callback) {
        elm.addEventListener(eventName, (event) => {
            callback(event)
        })
    }

    saveTodos() {
        const s = JSON.stringify(this.todoModel.getTodoList())
        localStorage.todoList = s
    }

    loadTodos() {
        const s = localStorage.todoList
        return JSON.parse(s)
    }

    addTodo(todo) {
        this.todoModel.todoList.push(todo)
    }

    deleteTodo(index) {
        this.todoModel.todoList.splice(index, 1)
    }

    insertTodo(todo) {
        const todoContainer = e('#id-div-container')
        const t = this.todoView.templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', t);
    }

    initTodos() {
        if (localStorage.getItem("todoList") !== null) {
            this.todoModel.setTodoList(this.loadTodos())
            for (let i = 0; i < this.todoModel.getTodoList().length; i++) {
                const todo = this.todoModel.getTodoList()[i]
                this.insertTodo(todo)
            }
        }
    }

}


class AddButtonController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._elm = e('#id-button-add')

        this.bindEvent(this._elm, 'click', (event) => {
            const todoInput = e('#id-input-todo')
            const task = todoInput.value

            const todo = {
                'task': task,
                'time': currentTime()
            }

            this.addTodo(todo)
            this.saveTodos(todo)
            this.insertTodo(todo)
        })
    }
}


class InputController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._todoContainer = e('#id-div-container')
        this.bindEvent(this._todoContainer, 'keydown', (event) => {
            const target = event.target
            if (event.key === 'Enter') {
                // 失去焦点
                target.blur()
                    // 阻止默认行为的发生, 也就是不插入回车
                event.preventDefault()
                    // 更新 todo
                const index = indexOfElement(target.parentElement)
                    // 把元素在 todoList 中更新
                this.todoModel.getTodoList()[index].task = target.innerHTML
                    // todoList.splice(index, 1)
                this.saveTodos()
            }
        })
    }

}


class MainController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._todoContainer = e('#id-div-container')
            // init todos in mian controller
        this.initTodos()
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement

            if (target.classList.contains('todo-done')) {
                toggleClass(todoDiv, 'done')
            } else if (target.classList.contains('todo-delete')) {
                const index = indexOfElement(target.parentElement)
                todoDiv.remove()
                this.deleteTodo(index)
                this.saveTodos()
            } else if (target.classList.contains('todo-edit')) {
                const cell = target.parentElement
                const span = cell.children[3]
                span.setAttribute('contenteditable', 'true')
                    // span.contentEditable = true
                span.focus()
            }
        })
    }
}


class BlurController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._todoContainer = e('#id-div-container')
        this.bindEvent(this._todoContainer, 'blur', (event) => {
            const target = event.target
            if (target.classList.contains('todo-label')) {
                // 让 span 不可编辑
                target.setAttribute('contenteditable', 'false')
                    // 更新 todo
                const index = indexOfElement(target.parentElement)
                    // 把元素在 todoList 中更新
                this.todoModel.setTodoTask(index, target.innerHTML)
                    // todoList.splice(index, 1)
                this.saveTodos()
            }
        })
    }
}