describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Manassés Jr.',
      username: 'manajr',
      password: 'mana1297'
    }
    cy.request('POST', 'http://localhost:3003/api/user', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('manajr')
      cy.get('#password').type('mana1297')
      cy.contains('login').click()
      cy.contains('User Manassés Jr. logged in')
    })

    it('login fails with wrong password', function() {
      cy.get('#username').type('manajr')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.contains('log in to application')
      cy.get('html').should('not.contain', 'Manassés Jr. logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'manajr', password: 'mana1297'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('create a new blog', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a new blog created by cypress')
      cy.get('#author').type('Manassés Jr')
      cy.get('#url').type('www.teste.com.br')
      cy.get('#newBlog__CreateBtn').click()
      cy.contains('a new blog created by cypress')
    })

    describe('blog can be created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'Manasses Jr',
          url: 'www.teste2.com.br'
        })
      })

      it('the like button are working', function() {
        cy.contains('view').click()
        cy.contains('likes').click()
        cy.contains('1')
      })

      it('can delete a blog', function () {
        cy.contains('view').click()
        cy.contains('delete').click()

        cy.get('.green').contains('deleted')
      })

      it('blog ordered by like quantity', function() {
        cy.createBlog({
          title: 'third blog cypress',
          author: 'Manasses Jr',
          url: 'www.teste3.com.br'
        })

        cy.get('.blog__Container').contains('view').click()
        cy.contains('likes').contains('likes').click()
        cy.get('.blog__Container:first')
          .contains('another blog cypress')
      })
    })
  })
})