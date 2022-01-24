import React from "react"
import Person from './Person'


const Persons = ({search, persons}) => {
  return (
    <table>
      <tbody>
        {filterPersons(search, persons).map(person =>
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
          />
        )}
      </tbody>
    </table>
  )
}

// Default(no input in search): returns an array with every single person.
// If search input: returns an array with matching persons if any.
const filterPersons = (search, persons) => {
  if (search !== '') {
    return (persons.filter(person =>
      person.name.toLowerCase().indexOf(search.toLowerCase()) > -1))
  } else {
    return persons
  }
}

export default Persons