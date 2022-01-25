import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isError ? 'messageError' : 'messageSuccess'}>
      {message}
    </div>
  )

}

export default Notification