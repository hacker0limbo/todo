const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')


app.use(bodyParser.json())
app.use(express.static('public'))

const routes = require('./routes/api_router.js')(app)

const server = app.listen(3000, () => {
    console.log('访问 localhost:3000');
})