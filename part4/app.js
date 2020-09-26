require('dotenv').config()
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blog')
const cors = require('cors')
const mongoose = require('mongoose')
const logging = require('./utils/logging')
const config = require('./utils/config')
const Blog = require('./models/blog')

logging.info('connecting to', config.MONGODB_URI)

const mongoUrl = process.env.MONGODB_URI 
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logging.info('connected to MongoDB')
  })
  .catch(error => {
    logging.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

/*const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

module.exports = app