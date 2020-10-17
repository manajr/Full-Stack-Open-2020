const badSchemaUrlTitle = (request, response) => {
  response.status(400).send({error:'Bad Request'})
}

module.exports = {
  badSchemaUrlTitle
}