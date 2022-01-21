import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    var validInput = false
    var doesAlreadyExist = false
    
    event.preventDefault()

    validInput = newName !== '' && newPhoneNumber !== '' // input in form fields?
      ? true 
      : false

    if (validInput) {                    // if both fields in the form has text
      
      doesAlreadyExist = persons         // checks if person already exist
        .map(person => person.name)
        .includes(newName)
      
      if (!doesAlreadyExist) {            // if a person does not already exist

        const personObject = {            // new person obj
          name: newName,
          number: newPhoneNumber,
          id: persons.length + 1
        }

        setPersons(persons.concat(personObject))  // add new person obj
        setNewName('')                           
        setNewPhoneNumber('')
        
      } else {                                    // alert if person alredy exist
        alert(`${newName} is already added to phonebook`)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchChange} value={search}/>
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName} 
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search}/>
    </div>
  )
}

export default App