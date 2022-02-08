const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

// GET: every single blog
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// GET: one blog obj by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

// POST: a new blog obj
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user.id)

  if (!body.title || !body.url) {
    return response
      .status(400)
      .json({ error: 'missing url or/and title'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// DELETE: a single blog post by id
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blogId = request.params.id

  const blog = await Blog.findById(blogId)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blogId)
    return response.status(204).end()
  }
  response.status(401).json({ error: 'invalid user id' })
})


// PUT: update a blog by id
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter