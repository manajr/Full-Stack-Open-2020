require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Persona = require('./models/person')

morgan('tiny')

const logging = morgan((tokens,req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req,res,'content-length'), '-',
    tokens['response-time'](req,res),'ms'
  ].join(' ')
})

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(logging)


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Persona.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  const persona = new Persona ({
    name: person.name,
    number: person.number
  })

  if(!person.name || !person.number){
    response.status(400).json({
      error: 'name or number is missing'
    })
  }
  else if(Persona.find({name:persona.name}) === true){
    response.status(400).json({
      error: 'name must be unique'
    })
  } else{
    persona.save()
      .then(savedPerson => {
        response.json(savedPerson.toJSON())
      })
      .catch(error => next(error))
  }
})

app.get('/api/persons/:id', (request, response, next) => {
  Persona.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const date = new Date()
  Persona.count({}, (err, countResponse) => {
    response.send(`<p>Phonebook has info for ${countResponse} people</p>
        <p>${date}</p>`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  //const id = Number(request.params.id)
  //persons = persons.filter(person => person.id !== id)
  Persona.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
    
  const newPersona = {
    name: body.name,
    number: body.number
  }

  Persona.findByIdAndUpdate(request.params.id, newPersona, {new:true})
    .then(result => {
      console.log(result)
      if(result) {
        response.json(result)
      } else {
        response.status(200).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
    
  if (error.name === 'CastError' && error.kind == 'ObjectId'){
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})