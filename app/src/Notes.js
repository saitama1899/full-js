import { useState } from 'react'
import './App.css'
import Note from './components/Note'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'


function Notes () {
  const [showAll, setShowAll] = useState(true)
  const { notes, loading, errorMessage, toggleImportanceOf, addNote } = useNotes()
  const { user, handleLogOut } = useUser()

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      { loading ? 'Loading...' : '' }
      { 
        user 
          ? 
            <div>
              <NoteForm addNote={addNote} />
              <div>
                <button onClick={handleLogOut}>Log out</button>
              </div>
            </div>
          : <Notification message={'You cannot add note without user'}></Notification>
      }
      <div>
        <button onClick={() => {setShowAll(!showAll)}}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow
          .map((note, i) => (
            <Note
              key={i}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
      </ul>
    </>
  )
}

export default Notes
