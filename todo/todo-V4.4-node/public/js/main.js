        // router
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

        // controller and views
        const todoView = new TodoView()
        const controller = new TodoController(todoView)
        const addButtonController = new AddButtonController(todoView)
        const completeButtonController = new CompleteButtonController(todoView)
        const deleteButtonController = new DeleteButtonController(todoView)
        const editButtonController = new EditButtonController(todoView)
        const showFinishController = new ShowFinishController(todoView)

        controller.initTodos()