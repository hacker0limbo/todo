/**
 */

class TodoController {
    constructor(todoView) {
        this.todoView = todoView
    }

    bindEvent(elm, eventName, callback) {
        elm.addEventListener(eventName, (event) => {
            callback(event)
        })
    }

    bindAllEvents(elms, eventName, callback) {
        for (let i = 0; i < elms.length; i++) {
            const elm = elms[i]
            this.bindEvent(elm, eventName, callback)
        }
    }

    insertTodo(todo) {
        const todoContainer = this.todoView.getTodoContainer()
        const t = this.todoView.templateTodo(todo)
        todoContainer.insertAdjacentHTML('beforeend', t);
    }

    initTodos() {
        fetch('/todo/all')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log('/todo/all 所有的数据为', data);
                for (let i = 0; i < data.length; i++) {
                    const todo = data[i];
                    this.insertTodo(todo)
                }
            })
    }

}


class AddButtonController extends TodoController {
    constructor(todoView) {
        super(todoView)
        this._elm = e('#id-button-add')

        this.init()
    }

    init() {
        this.bindEvent(this._elm, 'click', (event) => {
            const todoInput = e('#id-input-todo')
            const task = todoInput.value

            const addData = {
                task: task,
            }

            fetch('/todo/add', {
                    method: 'POST',
                    body: JSON.stringify(addData),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    this.insertTodo(data)
                    console.log('/todo/add 增加的数据为', data)
                })
        })
    }
}


class CompleteButtonController extends TodoController {
    constructor(todoView) {
        super(todoView)
        this._elms = es('.todo-done')
        this._todoContainer = this.todoView.getTodoContainer()
        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement
            if (target.classList.contains('todo-done')) {
                const index = indexOfElement(target.parentElement)
                const id = index + 1

                fetch(`/todo/finish/${id}`)
                    .then((res) => {
                        return res.json()
                    })
                    .then((data) => {
                        console.log('完成的数据为', data)
                        this.updateView(data)
                    })
            }
        })
    }

    updateView(data) {
        this.todoView.finishTodo(data)
    }

}


class DeleteButtonController extends TodoController {
    constructor(todoView) {
        super(todoView)
        this._elms = es('.todo-delete')
        this._todoContainer = this.todoView.getTodoContainer()

        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement

            if (target.classList.contains('todo-delete')) {
                const index = indexOfElement(todoDiv)
                const id = index + 1

                fetch(`/todo/delete/${id}`)
                    .then((res) => {
                        return res.json()
                    })
                    .then((data) => {
                        console.log('删除的数据为', data);
                        this.updateView(index)
                    })
            }
        })
    }

    updateView(index) {
        this.todoView.removeTodo(index)
    }
}


class EditButtonController extends TodoController {
    constructor(todoView) {
        super(todoView)
        this._elms = es('.todo-edit')
        this._todoContainer = this.todoView.getTodoContainer()
        this.init()
    }

    init() {
        this.bindEvent(this._todoContainer, 'click', (event) => {
            const target = event.target
            const todoDiv = target.parentElement

            if (target.classList.contains('todo-edit')) {
                const index = indexOfElement(todoDiv)
                const id = index + 1

                const p = new Prompt('输入更新数据', (r, value) => {
                    if (r) {
                        const updateData = {
                            task: value,
                        }

                        fetch(`/todo/update/${id}`, {
                                method: 'POST',
                                body: JSON.stringify(updateData),
                                headers: new Headers({
                                    'Content-Type': 'application/json'
                                })
                            })
                            .then(res => res.json())
                            .then((data) => {
                                this.updateView(data)
                                console.log('更新的数据为', data)
                            })
                    } else {
                        console.log('用户点了 cancel 取消输入')
                    }
                })
            }
        })
    }

    updateView(todo) {
        this.todoView.editTodo(todo)
    }


}