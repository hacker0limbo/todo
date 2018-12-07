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
            // const mainController = new MainController(todoModel, todoView)
        addButtonController.initTodos()
    }
}


const __main = () => {
    const app = new TodoApp()
}

__main()