const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('initially when some users are saved', () => {
  // Test: users are returned as JSON
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Test: correct number of users returned
  test('correct amount of users are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('creating a new user', () => {
  // Test: create a new user successfully with valid data
  test('succeeds when data is valid', async () => {
    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).toContain('Henke')
  })

  // Test: creating a user fails when invalid username
  test('fails with status code 400 when username is invalid', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).not.toContain('He')
  })

  // Test: creating a user fails when invalid password
  test('fails with status code 400 when password is invalid', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).not.toContain('Henrik')
  })

  // Test: creating a user fails when username  is missing
  test('fails with status code 400 when username is missing', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserMissingUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)
  })

  // Test: creating a user fails when password is missing
  test('fails with status code 400 when password is missing', async () => {
    await api
      .post('/api/users')
      .send(helper.newUserInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterPost = await helper.usersInDb()
    expect(usersAfterPost).toHaveLength(helper.initialUsers.length)

    const usernames = usersAfterPost.map(u => u.username)
    expect(usernames).not.toContain('Henrik')
  })
})

afterAll(() => {
  mongoose.connection.close()
})