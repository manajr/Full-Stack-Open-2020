const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)  
    }
    return null
  }

const validateToken = async (request) => {
    const firstUser = await User.find({})
    const userForToken = {
    username: firstUser[0].username,
    id: firstUser[0]._id
    }
    
    const signToken = jwt.sign(userForToken, process.env.SECRET)
    const tokenFromHeader = getTokenFrom(request)
    const token = tokenFromHeader === null
        ? signToken 
        : tokenFromHeader
    
    const decodedToken = jwt.verify(String(token), process.env.SECRET)

    tokenLog(token, decodedToken)
  }

const tokenLog = (token, decodedToken) => {
    const isNotLogged = !token || !decodedToken.id
    if(isNotLogged) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
}

module.exports = { getTokenFrom, tokenLog,
    validateToken
}