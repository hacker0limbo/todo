class TodoApp {
    constructor() {
        const todoModel = new TodoModel()
        const todoView = new TodoView()
        const addButtonController = new AddButtonController(todoModel, todoView)
        const completeButtonController = new CompleteButtonController(todoModel, todoView)
        const deleteButtonController = new DeleteButtonController(todoModel, todoView)
        const editButtonController = new EditButtonController(todoModel, todoView)
        const inputController = new InputController(todoModel, todoView)
        const blurController = new BlurController(todoModel, todoView)
        addButtonController.initTodos()

        this.initRoutes()
    }

    initRoutes() {
        const router = new Router();
        const todoForm = e('.todo-form')
        const todoContainer = e('#id-div-container')
        router.route('/list', () => {
            todoForm.classList.add('hide')
            if (todoContainer.classList.contains('hide')) {
                todoContainer.classList.remove('hide')
            }
        })
        router.route('/add', () => {
            todoContainer.classList.add('hide')
            if (todoForm.classList.contains('hide')) {
                todoForm.classList.remove('hide')
            }
        })
    }
}


const __main = () => {
    const app = new TodoApp()
}

__main()