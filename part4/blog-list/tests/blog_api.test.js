const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let authToken = null

// Before each test
beforeEach(async () => {
  // deletes any test data in db
  await Blog.deleteMany({})
  await User.deleteMany({})

  // creates a test user and saves it to db
  const testUser = await new User(helper.newUser).save()

  // creates a token for the test user
  const userInfo = { username: testUser.username, id: testUser.id }
  authToken = jwt.sign(userInfo, process.env.SECRET)

  // init blog objects with user id
  const blogObjects = helper.initialBlogs.map(blog => {
    blog.user = testUser.id
    return new Blog(blog)
  })
  // save blog obj to db
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// When initial blog posts are saved
describe('when there is some blogs saved', () => {
  // Test: blogs are returned as JSON
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Test: correct number of blogs returned
  test('correct amount of blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  // Test: unique idendifier is named 'id'
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

// Test: adding a new blog
describe('adding a new blog', () => {

  // Test: create a new blog post successfully
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set('Authorization', `bearer ${authToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAfterPost.map(b => b.title)
    expect(titles).toContain(
      'Strange flowers in Iceland'
    )
  })

  // Test: posting a new blog without likes property defaults it to zero
  test('without likes param succeeds and defaults to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutLikes)
      .set('Authorization', `bearer ${authToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  // Test: that response is 400 when posting invalid data
  test('fails with status code 400 when data is invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutTitleAndUrl)
      .set('Authorization', `bearer ${authToken}`)
      .expect(400)
  })

  // Test: fails with code 401 if a token is not provided
  test('fails with code 401 if a token is not provided', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
  })
})

// Test: removing a blog
describe('removing a blog', () => {

  // Test: succeeds when removing blog with valid id
  test('succeeds with status code 204 when id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).not.toContain(blogToDelete.title)

  })

  // Test: that response is 404 when id is invalid
  test('fails with status code 404 when id is invalid', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .delete(`/api/notes/${nonExistingId}`)
      .set('Authorization', `bearer ${authToken}`)
      .expect(404)
  })
})

// Test: updating a blog
describe('updating a blog', () => {

  // Test: succeeds with status code 200 when id and data is valid
  test('succeeds with status code 200 when id and data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogsAtStart[0].id)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
  })

  // Test: fails with status code 404 when id is invalid
  test('fails with status code 404 when id is invalid', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .put(`/api/notes/${nonExistingId}`)
      .send(helper.newBlog)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})