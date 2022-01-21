import React from "react"

const PersonForm = ({ onSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
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
  )
}

export default PersonForm