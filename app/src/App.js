import { useEffect, useState } from 'react'

import './App.css'

import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'

import noteService from './services/notes'

function App () {
  const [notes, setNotes] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState('')

  // Fetch: Recuperar datos de internet a partir de una dirección, devuelve una promesa. Se ejecuta de forma asincrona.
  // Asincrona: Tu aplicación se renderiza antes de que pueda terminar de ejecutarse esta promesa.
  // Promesa: Es un objeto que guarda un valor futuro. Las promesas se van resolviendo en el then
  // UseEffect: Se utiliza para que al hacer un fetch, se actualiza el estado, y vuelve renderizarse, no se vuelva a ejecutar el fetch
  // y evitar asi un render infinito. Tienes que indicarle como segundo parametro, cuantas veces quieres que se ejecute (una vez = []).
  // Dentro de este parametro, se le puede indicar un state. Entonces se ejecutará cada vez que el estado cambie.
  // React pasa de largo y va renderizando todo lo que pueda, aunque la promesa del fetch tarde en devolver un valor

  // Get notes
  useEffect(() => {
    setLoading(true)

    noteService.getAllNotes()
      .then(notes => {
        setNotes(notes)
        setLoading(false)
      })
  }, [])

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

  // Metodo que utilizará el componente formNote para actualizar el state de notas
  const addNote = (note) => {
    noteService
      .createNote(note)
      .then(newNote => {
        setNotes([...notes, newNote])
      })
  }

  // Metodo que utilizará el componente formLogin para actualizar el user
  const addUser = (user) => {
    setUser(user)
  }

  const addErrorMessage = (error) => {
    setErrorMessage(error)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .updateNote(id, changedNote)
      .then(returnedNote => {
        console.log(returnedNote)
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      {loading ? 'Loading...' : ''}

      {
        user
          ? <>
              <NoteForm addNote={addNote} />
              <div>
                <button onClick={handleLogOut}>Log out</button>
              </div>
            </>
          : <LoginForm addUser={addUser} addErrorMessage={addErrorMessage} />
      }

      <ol>
        {notes
          .map(note => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
      </ol>
    </>
  )
}

export default App
