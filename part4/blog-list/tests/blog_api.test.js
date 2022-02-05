const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// Test: blogs are returned as JSON
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Test: correct number of blogs returned
test('correct amount of blog posts returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// Test: unique idendifier is named 'id'
test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

// Test: POST function
describe('post', () => {

  // Test: create a new blog post successfully
  test('a new blog successfully', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
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
  test('a blog without likes and likes defaulted to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toEqual(0)
  })

  // Test: that response is 400 when posting invalid data
  test('invalid data and recieved response 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogWithoutTitleAndUrl)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})