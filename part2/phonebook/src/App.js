import React, { useState } from 'react'
import PersonForm from './Components/PersonForm'
import Person from './Components/Person'
import Filter from './Components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas',
     number: "040-1234567"},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ personsSearch, setPersonsSearch ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    if(persons.filter(person => person.name === newName).length !== 0){
      window.alert(`${newName} already exist in the list`)
    }
    else{
      if (newName === ''){
        setSearch(newSearch)
        setNewSearch('')
        setPersonsSearch(personsSearch.concat(persons.filter(person => 
        person.name.toLowerCase().includes(search.toLowerCase()))))
      }
      else{
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handlePersonSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const item = (search.length > 1) ?
    persons.filter(data => data.name.includes(search)) :
    persons;

  return (
    <div>
      <Filter newSearch={newSearch} handleChange={handlePersonSearch} />
      <h2>add a new</h2>
          <PersonForm newItem={newName}
          handleChange={handlePersonChange} text={'name:'}/>
          <PersonForm newItem={newNumber} 
          handleChange={handleNumberChange} text={'number:'} />
          
        <form onSubmit={addPerson}> 
          <button type="submit">add</button>
        </form>
        
        <h2>Numbers</h2>
        <Person item={item} />
    </div>
  )
}

export default App
