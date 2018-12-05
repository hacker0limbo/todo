class TodoApp {
    constructor() {
        const todoModel = new TodoModel()
        const todoView = new TodoView()
        const addButtonController = new AddButtonController(todoModel, todoView)
        const inputController = new InputController(todoModel, todoView)
        const mainController = new MainController(todoModel, todoView)
    }
}


const __main = () => {
    const app = new TodoApp()
}

__main()