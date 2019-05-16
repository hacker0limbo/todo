// 定义一个存储数据的数组
var todoList = []

// 绑定两个事件
var bindEventAdd = function() {
    var addButton = document.querySelector('#id-button-add')
    addButton.addEventListener('click', function(){
        // 获得 input.value
        var todoInput = document.querySelector('#id-input-todo')
        var task = todoInput.value
        // 生成 todo 对象
        var todo = {
            'task': task,
            'time': currentTime()
        }
        // 每次进行数据添加
        todoList.push(todo)
        saveTodos()
        insertTodo(todo)
    })
}

var bindEventButton = function() {
    // 事件委托, 委托到父父元素
    var todoContainer = document.querySelector('#id-div-container')
    // 通过 event.target 的 class 来检查点击的是什么 event.target 指的是当前点击的元素
    todoContainer.addEventListener('click', function(event){
        var target = event.target
        // 通过 todo-done 或者 todo-delete 来判断完成还是删除按钮
        if (target.classList.contains('todo-done')) {
            // 给 todo div 开关一个状态 class
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
        }
        else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            var index = indexOfElement(todoDiv)

            todoDiv.remove()
            todoList.splice(index, 1)
            saveTodos()
        }
    })
}

var bindEventEnter = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('keydown', function(event){
        var target = event.target
        if(event.key === 'Enter') {
            // 失去焦点, 你按下了回车就相当于退出这个修改框
            target.blur()
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML
            saveTodos()
        }
    })
}

var bindEventBlur = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('blur', function(event){
        var target = event.target
        if (target.classList.contains('todo-label')) {
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false')
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML
            // todoList.splice(index, 1)
            saveTodos()
        }
    }, true)
}


// 将所有事件封装到一起
var bindEvents = function() {
    bindEventAdd()
    bindEventButton()
    bindEventEnter()
    bindEventBlur()
}

var insertTodo = function(todo) {
    // 每次自动找到这个 container 里面然后添加 todoList 里面保存的数据
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
}

// 用来添加任务列表的代码
var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

// 保存 todoList
var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    // 常见思路 我有我就删掉你 没有我就添加你
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    }
    else {
        element.classList.add(className)
    }
}

var currentTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`

    return timeString
}

var initTodos = function() {
    todoList = loadTodos()
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}


var __main = function() {
    // 绑定事件
    bindEvents()
    // 程序加载后, 加载 todoList 并且添加到页面中
    initTodos()
}
__main()
