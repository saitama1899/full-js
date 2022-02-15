import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { NoteDetail } from "./components/NoteDetail"
import Notes from './Notes'
import Login from './Login'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const App = () => {

  const {user} = useUser()
  const {notes, loading} = useNotes()

  return (
    <BrowserRouter>
      <header>
        <Link to="/" style={inlineStyles}>Home</Link>
        <Link to="/users" style={inlineStyles}>Users</Link>
        <Link to="/notes" style={inlineStyles}>Notes</Link>
        {
          user
            ? <em>Hola, {user.name}</em>
            : <Link to="/login" style={inlineStyles}>Login</Link>
        }
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/notes/:id' element={<NoteDetail notes={notes} />} />
        <Route path='/login' element={<Login />} render={() => {
          return user ? <Navigate replace to="/" /> : <Login />
        }} />
      </Routes>
    </BrowserRouter>
  )
}

export default App