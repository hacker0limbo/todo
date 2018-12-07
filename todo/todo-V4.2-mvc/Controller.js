/**
 * Todo
 * 问题:
 *   1, 如果有 todo 删除, localstorage 无法保存该状态 (完成)
 *   2, 可以有 完成与未完成的状态, 同时要分别保存到对应的 localstorage, 目前一旦完成就无法修改 (完成)
 *   3, 根据 2, controller 需要根据 model 里面的数据更新 view, button 名字的改变和 style 样式的改变, 最好为 动态更新(object.defineOwnPreperty 之类的)
 *   4, 编辑功能无法使用 无法对编辑了 todo 保存
 */

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

    bindAllEvents(elms, eventName, callback) {
        for (let i = 0; i < elms.length; i++) {
            const elm = elms[i];
            this.bindEvent(elm, eventName, callback)
        }
    }

    saveTodos() {
        const s = JSON.stringify(this.todoModel.getTodoList())
        localStorage.todoList = s
    }

    loadTodos() {
        const s = localStorage.todoList
        return JSON.parse(s)
    }

    insertTodo(todo) {
        const todoContainer = this.todoView.getTodoContainer()
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

        this.init()
            // this.initTodos()
    }

    addTodo(todo) {
        this.todoModel.addTodo(todo)
    }

    init() {
        this.bindEvent(this._elm, 'click', (event) => {
            const todoInput = e('#id-input-todo')
            const task = todoInput.value

            const todo = new TodoTaskModel(task)

            this.addTodo(todo)
            this.saveTodos(todo)
            this.insertTodo(todo)
        })
    }
}


class CompleteButtonController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._elms = es('.todo-done')
        this._todoContainer = this.todoView.getTodoContainer()
        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement
            if (target.classList.contains('todo-done')) {
                // 更新 View
                // todo 重构
                const index = indexOfElement(target.parentElement)
                    // 更新 Model
                this.todoModel.toogleTaskDone(index)
                this.todoModel.toogleButtonDone(index)

                this.todoView.update(index, this.todoModel.getTodo(index))

                this.saveTodos()
            }
        })
    }
}


class DeleteButtonController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._elms = es('.todo-delete')
        this._todoContainer = this.todoView.getTodoContainer()

        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement

            if (target.classList.contains('todo-delete')) {
                const index = indexOfElement(target.parentElement)
                todoDiv.remove()
                this.deleteTodo(index)
                this.saveTodos()
            }
        })
    }

    deleteTodo(index) {
        this.todoModel.deleteTodo(index)
    }
}


class EditButtonController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._elms = es('.todo-edit')
        this._todoContainer = this.todoView.getTodoContainer()

        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            if (target.classList.contains('todo-edit')) {
                const cell = target.parentElement
                const span = cell.children[3]
                span.setAttribute('contenteditable', 'true')
                span.focus()
            }
        })
    }
}


class InputController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._todoContainer = this.todoView.getTodoContainer()

        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'keydown', (event) => {
            const target = event.target
            if (event.key === 'Enter') {
                target.blur()
                event.preventDefault()
                const index = indexOfElement(target.parentElement)
                this.todoView.update(index, this.todoModel.getTodo(index))
                this.saveTodos()
            }
        })
    }

}


class BlurController extends TodoController {
    constructor(todoModel, todoView) {
        super(todoModel, todoView)
        this._todoContainer = this.todoView.getTodoContainer()

        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'blur', (event) => {

            const target = event.target
            if (target.classList.contains('todo-label')) {
                target.setAttribute('contenteditable', 'false')
                const index = indexOfElement(target.parentElement)

                this.todoView.update(index, this.todoModel.getTodo(index))
                    // this.todoModel.todoList[index].task = target.innerHTML
                this.saveTodos()
            }
        }, true)
    }
}