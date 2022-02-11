// Para ejecutar cypress npm run cypress:open añadiendo en el package el scrpit
// "cypress:open": "cypress open"
// Para usar cypress, hay que abrir la api en modo test 

describe('Note App', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
    // Limpiar BD
    cy.request('POST', 'http://localhost:3008/api/testing/reset')
    const user = {
      name: 'Eric',
      username: 'eselva92',
      password: 'contraseña_eric'
    }
    
    cy.request('POST', 'http://localhost:3008/api/users', user)
  })
  // Smock test
  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()
    // cy.get('input:first').type('eselva92')
    // cy.get('input:last').type('contraseña_eric')
    // cy.get('input').first().type('eselva92')
    // cy.get('input:last').last().type('contraseña_eric')
    cy.get('[name="Username"]').type('eselva92')
    cy.get('[name="Password"]').type('contraseña_eric')
    cy.get('#form-login-button').click()
    cy.contains('New note')
  })

  it('login fails if wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[name="Username"]').type('eselva92')
    cy.get('[name="Password"]').type('dfsfdg')
    cy.get('#form-login-button').click()
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'border-style', 'solid')
  })
  describe('when logged in', () => {
    beforeEach(() => {
      // cy.contains('Show login').click()
      // cy.get('[name="Username"]').type('eselva92')
      // cy.get('[name="Password"]').type('contraseña_eric')
      // cy.get('#form-login-button').click()
      // cy.contains('New note')

      // Es mejor simular el login usando directamente la API
      // Este código se ha creado como un comando en /support/commands.js
      cy.login({
        username: 'eselva92',
        password: 'contraseña_eric'
      })
    })

    it('a new note can be created', () => {
      const noteContent ='A note created with cypress'
      cy.contains('New note').click()
      cy.get('input').type(noteContent)
      cy.contains('Save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'First note created from cypress', important: false })
        cy.createNote({ content: 'Second note created from cypress', important: false })
        cy.createNote({ content: 'Third note created from cypress', important: false })
      })

      it('it can be made important', () => {
        cy.contains('Second note created from cypress').as('secondNote')
        
        cy.get('@secondNote')
          .get('button')
          .contains('make important')
          .click()
        
        // cy.debugger()
        cy.get('@secondNote')
          .get('button')
          .contains('make not important')
      })
    })
  })
})