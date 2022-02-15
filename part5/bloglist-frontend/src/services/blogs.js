import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// set user auth token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// get all blog posts
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// create a new blog post
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// update a blog post
const update = async (blogId, blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    generateUrl(blogId), 
    blogObject, 
    config
  )
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(generateUrl(blogId), config)
  return response.data
}

const generateUrl = (blogId) => {
  return baseUrl.concat(`/${blogId}`)
}

const blogService = { getAll, create, update, remove, setToken }

export default blogService