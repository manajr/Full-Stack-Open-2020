//Importing
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//Defining URL to acces MongoDB Atlas Database
const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

//Mongoose Connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).catch(e=>console.log('Connection Error'))

//Mongoose Schema definition
const personSchema = new mongoose.Schema({
	name: {type: String, minlength: 3, unique: true},
	number: {type: String, minlength: 8} 
});

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Persona', personSchema)