import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {

  // dummy data - remove before creating build
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=> {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {  // add a new person
    event.preventDefault()

    const validInput = newName !== '' && newPhoneNumber !== '' // input in form fields?
      ? true 
      : false

    if (validInput) {                    // if both fields in the form has text
      
      const doesAlreadyExist = persons         // checks if person already exist
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