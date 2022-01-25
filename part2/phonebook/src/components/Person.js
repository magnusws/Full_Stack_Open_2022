import React from 'react'

const Person = ({ id, name, number, onClick }) => {
  return (
    <>
      <tr>
        <td>
          {name} {number}
          <button value={id} onClick={onClick}>delete</button>
        </td>
      </tr>
    </>
    )
}

export default Person