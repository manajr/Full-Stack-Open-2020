const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]
const personNewName = process.argv[3]
const personNewNumber = process.argv[4]
const argvLen = process.argv.length

const url =
	`mongodb+srv://fullstack-2020-phonebook:${password}@cluster0.j5mne.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).catch(e=>console.log('Connection Error'))

const personSchema = new mongoose.Schema({
	name: String,
	number: String 
});

const Persona = mongoose.model('Persona', personSchema);

if (argvLen < 4){
	console.log("phonebook:")
	Persona.find({}).then((result) => {
		result.forEach(person => {
			console.log(person.name, person.number)
			})
		mongoose.connection.close()
		})
}
else if (argvLen <= 5 && argvLen >=4  ) {
	const person = new Persona({
		name: personNewName,
		number: personNewNumber
	})

	person.save().then(result => {
		console.log(`added ${personNewName} number ${personNewNumber} to phonebook`)
		mongoose.connection.close()
	})
}

else {
	console.log("The input arguments are not correct")
	process.exit(2)
}