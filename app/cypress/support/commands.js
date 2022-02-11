Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3008/api/login', { username, password })
    .then(res => {
      localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(res.body)
      )
    })
  // Tienes que volver a recargar (renderizar) la página para iniciarla logueado
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3008/api/notes',
    body: { content, important },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
