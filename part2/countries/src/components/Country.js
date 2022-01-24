import React from 'react'

const Country = ({name, onClick}) => {
    return (
      <tr>
        <td>
          {name}
          <button value={name} onClick={onClick}>
            Show
          </button>
        </td>
      </tr>
    )
}

export default Country