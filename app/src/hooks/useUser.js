import { useEffect, useState } from 'react'
import noteService from '../services/notes'

export const useUser = () => {
  const [user, setUser] = useState(null)

  // Coger sesion iniciada del localstorage
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  // Metodo que utilizará el componente formLogin para actualizar el user
  const addUser = (user) => {
    setUser(user)
  }

  return {
    user,
    handleLogOut,
    addUser
  }
}
