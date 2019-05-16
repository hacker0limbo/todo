console.log('--------------API 测试------------')
    /**
     * /todo/all (Get)
     */
fetch('/todo/all')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('/todo/all 所有的数据为', data);
    })


/**
 * /todo/add (POST)
 */
const addData = {
    task: '写代码',
}

fetch('/todo/add', {
        method: 'POST',
        body: JSON.stringify(addData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log('/todo/add 增加的数据为', data))

/**
 * /todo/delete/:id (GET) 
 */
fetch('/todo/delete/2')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('/todo/delete/2 删除的 id 为 2 的数据为', data);
    })

/**
 * /todo/update/:id (POST)
 */
const updateData = {
    task: '玩',
}

fetch('/todo/update/1', {
        method: 'POST',
        body: JSON.stringify(updateData),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log('/todo/update/1 更新的 id 为 1 的数据为', data))