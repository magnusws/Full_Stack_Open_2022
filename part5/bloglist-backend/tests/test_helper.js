const Blog = require('../models/blog')
const User = require('../models/user')

// Authorization key
const authKey = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hZ251c3dzIiwiaWQiOiI2MjAwMDIzOTM0NTQwNDUwZTdmMWFhZDUiLCJpYXQiOjE2NDQzMTQ1MTh9.e210V8g9sgateDqooKzFUq34Z8zehKSeUeEgMo_y5RA'

// empty list
const emptyList = []

// list with data for one blog
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// list with data for six blogs
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

// data for new blog entry
const newBlog = {
  title: 'Strange flowers in Iceland',
  author: 'Elon Musk',
  url: 'https://www.tesla.com',
  likes: 3,
}

const newBlogWithoutLikes = {
  title: 'Strange flowers in Iceland',
  author: 'Elon Musk',
  url: 'https://www.tesla.com',
}

const newBlogWithoutTitleAndUrl = {
  author: 'Elon Musk',
  likes: 5,
}

// initial users
const initialUsers = [
  {
    "username": "Yahoo",
    "name": "Berit Andersen",
    "password": "teddy"
  },
  {
    "username": "Jippiii",
    "name": "Truls Svendsen",
    "password": "teddy"
  },
  {
    "username": "Whoooah",
    "name": "Lisbeth Salander",
    "password": "teddy"
  }
]

// data for new user
const newUser = {
  "username": "Henke",
  "name": "Henrik Hansen",
  "password": "teddy"
}

const newUserInvalidUsername = {
  "username": "He",
  "name": "Henrik Hansen",
  "password": "teddy"
}

const newUserInvalidPassword = {
  "username": "Henke",
  "name": "Henrik Hansen",
  "password": "te"
}

const newUserMissingUsername = {
  "name": "Henrik Hansen",
  "password": "teddy"
}

const newUserMissingPassword = {
  "username": "Henke",
  "name": "Henrik Hansen",
}

// help func returns every blog saved in db
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

// help func returns every user saved in db
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

// help func returns a non existing id
const nonExistingId = async () => {
  const blog = new Blog(newBlog)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  authKey,
  emptyList,
  listWithOneBlog,
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitleAndUrl,
  initialUsers,
  newUser,
  newUserInvalidUsername,
  newUserInvalidPassword,
  newUserMissingUsername,
  newUserMissingPassword,
  nonExistingId,
  blogsInDb,
  usersInDb
}