const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET: every single blog
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!body.title || !body.url ){
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const result = await blog.save()
  response.status(201).json(result)
})

// DELETE: a single blog post by id
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


// PUT: update a blog by id
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter