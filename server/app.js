require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const mongoose = require ('mongoose')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const articleRouter = require('./routes/articles')
const port = 4000

const app = express()
app.use(cors())
mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser: true})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;