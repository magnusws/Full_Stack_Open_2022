import React from 'react'

const Person = ({ name, number }) => {
  return (
    <tr>
      <td>
        {name} {number}
      </td>
    </tr>)
}

export default Person