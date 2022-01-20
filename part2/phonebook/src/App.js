import React, { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <tr>
      <td>
        {name} {number}
      </td>
    </tr>)
}

// Check if the key and values og two person objects 
const areThesePersonsEqual = (first, second) => {
  if (first.name === second.name) return true
  if (first.number === second.number) return true
  return false
}
// this.state.projects.filter(val => 
// val.title.toLowerCase().indexOf(search.toLowerCase()) > -1

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  const addName = (event) => {
    var validInput = false
    var doesAlreadyExist = false

    event.preventDefault()

    if(newName !== '' && newPhoneNumber !== '') {
      validInput = true
    }

    if(validInput){

      const personObject = {
        name: newName,
        number: newPhoneNumber,
        id: persons.length + 1
      }

      persons.forEach(person => {
        doesAlreadyExist = areThesePersonsEqual(person, personObject)
      })

      if (!doesAlreadyExist) {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewPhoneNumber('')

      }else {
        alert(`${newName} is already added to phonebook`)
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    // if(newSearch === '') setPersonsToShow(persons)
    setPersonsToShow(persons.filter(person =>
      person.name.toLowerCase().indexOf(newSearch.toLowerCase()) > -1))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with</p>
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:  
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          <br></br>
          number:
          <input
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map(person =>
            <Person 
              key={person.id} 
              name={person.name} 
              number={person.number}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App