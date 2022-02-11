import { useRef, useState } from 'react'
import Togglable from './Togglable'

export default function LoginForm ({ addNote }) {
  const [contentNote, setContentNote] = useState('')

  // useRef se utiliza para crear una referencia a un elemento incluso si se vuelve a renderizar
  const togglableRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const note = {
      content: contentNote,
      important: false
    }
    // Subimos la nota nueva para actualizarla en componente App
    addNote(note)
    setContentNote('')
    // Usamos la referencia creada en el componente hijo (Togglable) para activar el
    // boton de ocultar
    togglableRef.current.toggleVisibility()
  }
  return (
    <Togglable buttonLabel={'New note'} ref={togglableRef}>
      <h3>New note</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Write your note content'
          onChange={({ target }) => setContentNote(target.value)}
          value={contentNote}
        />
        <button>Save</button>
      </form>

    </Togglable>
  )
}
