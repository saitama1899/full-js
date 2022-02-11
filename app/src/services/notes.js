import axios from 'axios'

// const baseUrl = 'http://localhost:3008/api/notes'
// Una vez servimos la app desde la api con build, se utilizan rutas relativas
// Para que la app siga funcionando en local para el desarrollo, hay que añadir un proxy en el package.json de la app
const baseUrl = '/api/notes'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllNotes = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNote = (note) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, note, config)
  return request.then(response => response.data)
}

const updateNote = (id, newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAllNotes, createNote, updateNote, setToken }
