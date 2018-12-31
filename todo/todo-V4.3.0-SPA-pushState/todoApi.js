// TODO API
// 创建 todo object
var todoNew = function(task) {
    var t = {
        task: task,
        done: false,
    }
    return t
}
// 保存一个 todoList
var saveTodos = function(todoList) {
    localStorage.todos = JSON.stringify(todoList)
}
// 保存 todo
var saveTodo = function(todo) {
    var todoList = loadTodos()
    todoList.push(todo)
    saveTodos(todoList)
}
// 返回存储的所有 todo
var loadTodos = function() {
    var todoStr = localStorage.todos
    log('todoStr', todoStr)
    // 第一次读取的时候，结果是 undefined
    // 所以需要设置为空数组 '[]'
    // 否则 JSON.parse 就报错了
    if (todoStr == undefined) {
        todoStr = '[]'
    }
    var todoList = JSON.parse(todoStr)
    return todoList
}

//
var saveEditTodos = function() {
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组中
    // 4 保存数组
    log('save todos')
    // 只应该找 '.todo-edit' 里面的所有 cell
    var edit = document.querySelector('.todo-edit')
    var contents = edit.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        log('debug todo content', c)
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            'done': done,
            'task': c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    log('save edit todos ', todos, todos.length)
    // 保存数组
    saveTodos(todos)
}
