// Endpoint para vaciar la BD de testing

const testingRouter = require('express').Router()
const Note = require('../models/Note.js')
const User = require('../models/User.js')
// const userExtractor = require('../middleware/userExtractor')

testingRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = testingRouter
