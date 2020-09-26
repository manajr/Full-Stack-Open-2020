const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logging = require('./utils/logging')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logging.info(`Server running on port ${config.PORT}`)
})