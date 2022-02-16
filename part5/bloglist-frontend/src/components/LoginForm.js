import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
}) => {

  return (
    <form id='login-form' onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username-input'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password-input'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

PropTypes.displayName = 'LoginForm'

export default LoginForm