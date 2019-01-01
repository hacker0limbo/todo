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

// 返回自己在父元素中的下标
const indexOfElement = element => {
    const parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        const e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

// 这个函数用来开关一个元素的某个 class
const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}


const toogleContent = (element, content1, content2) => {
    const content = element.innerHTML
    if (content == content1) {
        element.innerHTML = content2
    } else {
        element.innerHTML = content1
    }
}

const e = elm => document.querySelector(elm)

const es = elms => document.querySelectorAll(elms)