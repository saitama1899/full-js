import { React, useState } from 'react'
// import PropTypes from 'prop-types'

import Togglable from './Togglable'
import { login } from '../services/users'
import noteService from '../services/notes'

export default function LoginForm ({ addUser, addErrorMessage = null }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login({
        username,
        password
      })
      // Guardar el login en el navegador
      // Se guarda como string ya que no admite objetos
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      addUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      addErrorMessage('Wrong credentials')
      setTimeout(() => {
        addErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Togglable buttonLabel={'Show login'}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Togglable>
  )
}

// LoginForm.propTypes = {
//   addUser: PropTypes.object.isRequired,
//   addErrorMessage: PropTypes.func.isRequired
// }
