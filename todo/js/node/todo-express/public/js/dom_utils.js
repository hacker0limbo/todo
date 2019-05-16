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

const removeAll = function(sel) {
    let tags = document.querySelectorAll(sel)
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i]
        tag.remove()
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}