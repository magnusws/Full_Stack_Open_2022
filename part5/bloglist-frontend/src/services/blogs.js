import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// set user auth token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// get all blog posts
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create a new blog post
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const blogService = { getAll, create, setToken }

export default blogService