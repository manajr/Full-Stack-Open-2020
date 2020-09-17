const express = require('express')
const morgan = require('morgan')

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

let persons =  [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.use(express.json())
app.use(logging)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const randId = Math.floor(Math.random()*1000)
    const person = request.body
    
    if(!person.name || !person.number){
        response.status(400).json({
            error: 'name or number is missing'
        })
    }
    else if(persons.filter(persona => person.name === persona.name).length > 0){
        response.status(400).json({
            error: "name must be unique"
        })
    }
    else{
        person.id = randId
        persons = persons.concat(person)
        
        console.log(person)
        response.json(person)
    }
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
