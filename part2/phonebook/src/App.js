import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Person from './Components/Person'
import Filter from './Components/Filter'
import personService from './services/persons'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ personsSearch, setPersonsSearch ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ search, setSearch] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [temp, setTemp] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personIndentifier = persons.filter(person => person.name === newName)

    if(personIndentifier?.length !== 0){
      if(newNumber !== ''){
        const checkPut = window.confirm(`${newName} is already added to phonebook,
         replace the old number with a new one?`)
        if (checkPut){
          const changedPerson = {...personIndentifier[0], number: newNumber}

          personService
          .update(personIndentifier[0].id, changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== personIndentifier[0].id ? person: returnedPerson))
          })
        }
      }
      else{
        window.alert(`${newName} already exist in the list`)
      }
    }
    else{
      if (newName === ''){
        setSearch(newSearch)
        setNewSearch('')
        setPersonsSearch(personsSearch.concat(persons.filter(person => 
          person.name.toLowerCase().includes(search.toLowerCase()))))
      }
      else{
        personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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

  const item = ( (search.length > 1) ?
    persons.filter(data => data.name.includes(search)) :
    persons
  )



 //Get value from Person component 
  const trackerPerson = (id) => {
    setTemp(id)
    setPersons(persons.filter(n => n.id.toString() !== id))
  }

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
          <Person item={item} tracker={trackerPerson} />
    </div>
  )
}

export default App
