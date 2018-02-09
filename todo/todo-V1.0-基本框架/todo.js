var addButton = document.querySelector('#id-button-add')
addButton.addEventListener('click', function(){
    // 获得 input.value
    var todoInput = document.querySelector('#id-input-todo')
    var todo = todoInput.value
    // 添加到 id-div-container 中 (作为子元素)
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
})

// 用来添加任务列表的代码
var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true'>${todo}</span>
        </div>
    `
    return t
}

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
        todoDiv.remove()
    }
})

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
