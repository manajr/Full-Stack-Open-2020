import React, { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Person from './Components/Person'
import Filter from './Components/Filter'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {

  const [ personGroup, setPersonGroup ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersonGroup(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const WITHOUT_ENTRY = '';
    const newPerson = createNewPerson();
    const newNumberNotVOID = newNumber !== WITHOUT_ENTRY;
    const newNameVOID = newName === WITHOUT_ENTRY;

    const newPersonExist = checkIfNewPersonInGroup()

    if(newPersonExist){
      const checkForUpdate = showWindowMessage(newNumberNotVOID)
      personUpdateNumber(checkForUpdate)
    } else{
      if (newNameVOID){
      } else{
        createInDB(newPerson);
      }
    }
  }

  const createInDB = (newPerson) => (
    personService.create(newPerson)
    .then(returnedPerson => {
      setErrorMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => setErrorMessage(null), 5000)
      setPersonGroup(personGroup.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.log(error.response.data.error)
      //setErrorMessage(`Person validation failed: name ${newPerson.name} is shorter than the minimum allowed length (3).`)
      setErrorMessage(error.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
      setNewName('')
      setNewNumber('')
    })
    );

  const personFilter =  newSearch.length > 1 ?
    personGroup.filter(person=>
      person.name.toLowerCase().includes(newSearch.toLowerCase())) :
      personGroup;
 
  const trackerPerson = (id) => {
    setPersonGroup(personGroup.filter(person => person.id.toString() !== id))
  }



  const whenClickDelete = (event) => {
    event.preventDefault()

    const nameFiltered = personFilter.filter(n=>
        n.id.toString() === event.target.id)
    const deleteConf = window.confirm(`Delete ${nameFiltered[0]?.name} `)        

    if(deleteConf) {
        trackerPerson(event.target.id)
    
        personService
        .deletePerson(event.target.id)
        .then(error=>{
            setErrorMessage(`Information of ${nameFiltered[0]?.name} has already been removed from server`)
            setTimeout(()=> {
                setErrorMessage(null)
            },5000)
        })
    }
}

  const createNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    return(newPerson)
  }

  const identifyPerson = () => (personGroup.filter(person =>
    person.name === newName)
 )

  const checkIfNewPersonInGroup = () => {
    const VOID_LIST = 0;
    const isPersonInGroup = identifyPerson().length !== VOID_LIST;
    return (isPersonInGroup)
  }

  const showWindowMessage = (condition) => {
    if (condition) {
      const havePerson = window.confirm(`${newName} is already added to phonebook,
      replace the old number with a new one?`)
      return havePerson
    }
    const havePerson = window.alert(`${newName} already exist in the list`)
    return false
  }

  const personUpdateNumber = (condition) => {
    if (condition){
      const changedPersonNumber = {...identifyPerson()[0], number:newNumber}

      personService
      .update(identifyPerson()[0].id, changedPersonNumber)
      .then(returnedUpdatedPerson => {
        setPersonGroup(personGroup.map(person =>person.id !== identifyPerson()[0].id ?
        person : returnedUpdatedPerson))
      })
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newSearch={newSearch} handleChange={handlePersonSearch}/>
      <h2>add a new</h2>
          <PersonForm newItem={newName}
          handleChange={handlePersonChange} text={'name:'}/>
          <PersonForm newItem={newNumber} 
          handleChange={handleNumberChange} text={'number:'} />
          
        <form onSubmit={addPerson}> 
          <button type="submit">add</button>
        </form>
        
        <h2>Numbers</h2>
          <Person item={personFilter} clickDeleteHandler={whenClickDelete} />
    </div>
  )
}

export default App
