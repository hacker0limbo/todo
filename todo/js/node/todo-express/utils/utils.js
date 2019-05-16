const currentTime = () => {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

const updateId = (todoList) => {
    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i]
        todo['id'] = i + 1
    }
}

module.exports = {
    currentTime,
    updateId
}