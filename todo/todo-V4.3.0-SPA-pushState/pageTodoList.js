var todoTemplate = function(todo) {
    var done = todo.done
    var task = todo.task
    var t = `
        <div class="todo-cell">
            ${task}
        </div>
    `
    return t
}

var todoEdit = function(todo, done) {
    var status = ''
    if (done) {
        status = 'done'
    }
    var task = todo.task
    var t = `
        <div class='todo-cell ${status}'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span class='todo-content' contenteditable='true'>${task}</span>
        </div>
    `
    return t
}

var todoDetail = function(todo) {
    var task = todo.task
    var t = `
        <div class='todo-cell'>
            <button class='todoList-detail'>点击查看Detail</button>
            <span class='todo-content' contenteditable='true'>${task}</span>
        </div>
    `
    return t
}

var insertTodoList = function(todoList) {
    var todoListDiv = e('.todo-list')
        // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoTemplate(todo)
        appendHtml(todoListDiv, t)
    }
}

var insertEdit = function(todoList) {
    var todoListDiv = e('.todo-edit')
        // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoEdit(todo, false)
        appendHtml(todoListDiv, t)
    }
}

var saveAllTodos = function() {
    var todoContainer = e('.todo-edit')
        // 通过 event.target 的 class 来检查点击的是什么
    todoContainer.addEventListener('click', function(event) {
        log('container click', event, event.target)
        var target = event.target
            // classList.contains 可以检查元素是否有一个 class
        if (target.classList.contains('todo-done')) {
            log('done')
                // target.parentElement 用来获取按钮的父节点
                // 给 todo div 开关一个状态 class
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
                // 改变 todo 完成状态之后，保存 todos
            saveEditTodos()
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
                // 找到按钮的父节点并且删除
            var todoDiv = target.parentElement
            todoDiv.remove()
                // 删除之后 保存 todos
            saveEditTodos()
        }
    })
}

var insertDetail = function(todoList) {
    var todoListDiv = e('.todo-detail')
        // 清空现有的所有 todo
    todoListDiv.innerHTML = ''
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        var t = todoDetail(todo)
        appendHtml(todoListDiv, t)
    }
}

// 加载所有 todo 并且显示在界面上
var showTodoList = function() {
    var todoList = loadTodos()
    log('debug todo list', todoList)
    insertTodoList(todoList)
    insertEdit(todoList)
    insertDetail(todoList)
}
saveAllTodos()