describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = { name: 'Test User', username: 'testuser', password: 'testisalasana' }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testisalasana')
      cy.get('#login').click()

      cy.contains('Logged in as "Test User"')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpw')
      cy.get('#login').click()

      cy.contains('Incorrect password')
      cy.should('not.contain', 'Logged in as')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testisalasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blogin nimi')
      cy.get('#author').type('Blogin Kirjoittaja')
      cy.get('#url').type('https://blogi.fi')
      cy.get('#create').click()

      cy.contains('A new blog was added')
      cy.contains('Blogin nimi')
      cy.contains('Blogin Kirjoittaja')
    })
  })
})
