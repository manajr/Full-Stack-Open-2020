require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const mongoose = require('mongoose')
const logging = require('./utils/logging')
const config = require('./utils/config')
const middleware = require('./utils/middleware')


logging.info('connecting to', config.MONGODB_URI)

const mongoUrl = process.env.MONGODB_URI 
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, 
  useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logging.info('connected to MongoDB')
  })
  .catch(error => {
    logging.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.badSchemaUrlTitle)

module.exports = app
