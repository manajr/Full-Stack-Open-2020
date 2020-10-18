const badSchemaUrlTitle = (request, response) => {
  response.status(400).send({error:'Bad Request'})
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  console.log(error.message)

  next(error)
}
/*
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)  
    return token
  }
    
  next()
}
*/
module.exports = {
  badSchemaUrlTitle,
  errorHandler,
  //tokenExtractor
}