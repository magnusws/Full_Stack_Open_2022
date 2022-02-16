
describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Testing',
      username: 'test',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('test')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('Test Testing logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('test')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')

      cy.get('html').should('not.contain', 'Test Testing logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'password' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#blog-title-input').type('This is a new blog title')
      cy.get('#blog-author-input').type('Firstname Lastname')
      cy.get('#blog-url-input').type('www.test.com')

      cy.get('#blog-form')
        .contains('create')
        .click()

      cy.contains('This is a new blog title')
      cy.contains('Firstname Lastname')
    })

    describe('and blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Name One', url:'www.test-one.com', likes: 1 })
        cy.createBlog({ title: 'second blog', author: 'Name Two', url: 'www.test-two.com', likes: 0 })
        cy.createBlog({ title: 'third blog', author: 'Name Three', url: 'www.test-three.com', likes: 3 })
      })

      it('users can like a blog', function () {
        cy.contains('second blog').parent().contains('view').click()
        cy.contains('second blog').parent().find('.blogLikeButton').click()
        cy.contains('second blog').parent().contains('likes 1')
      })

      it('the user who created a blog can delete it', function () {
        cy.contains('third blog').parent().contains('view').click()
        cy.contains('third blog').parent().contains('Test Testing')
        cy.contains('third blog').parent().find('#remove-button').click()
        cy.get('html').should('not.contain', 'third blog')
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.blogTitle').then(blogs => {
          expect(blogs[0]).to.have.text('third blog')
          expect(blogs[1]).to.have.text('first blog')
          expect(blogs[2]).to.have.text('second blog')
        })
      })
    })
  })
})