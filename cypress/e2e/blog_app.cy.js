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

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs`,
          method: 'POST',
          auth: { bearer: JSON.parse(localStorage.getItem('user')).token },
          body: { title: 'Blogin nimi', author: 'Blogin Kirjoittaja', url: 'https://blogi.fi' }
        })
        cy.request({
          url: `${Cypress.env('BACKEND')}/blogs`,
          method: 'POST',
          auth: { bearer: JSON.parse(localStorage.getItem('user')).token },
          body: { title: 'Toinen blogi', author: 'Toinen Henkilö', url: 'https://toinen.fi' }
        })
        cy.visit('')
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes: 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('Blogin nimi').parent().contains('view').click()
        cy.contains('delete').click()

        cy.get('html').should('not.contain', 'Blogin nimi')
      })

      it('Only the creator can delete a blog', function() {
        cy.contains('Log out').click()
        const user = { name: 'Another User', username: 'anotheruser', password: 'testisalasana' }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.login({ username: 'anotheruser', password: 'testisalasana' })
        cy.contains('view').click()

        cy.get('html').should('not.contain', 'delete')
      })

      it('Blogs are ordered by number of likes', function() {
        cy.get('.view-button:last').click()
        cy.contains('like').click()
        cy.visit('')

        cy.get('.view-button').should('have.length', 2)

        cy.get('.view-button:first').click()

        cy.contains('likes: 1')
      })
    })
  })
})
