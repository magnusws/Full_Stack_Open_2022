import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationText, setNotificationText] = useState(null)
  const [error, setError] = useState(false)

  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('test')

  const [user, setUser] = useState(null)


  useEffect(() => {
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getAllBlogs = async () => {
    const blogsTemp = await blogService.getAll()
    const sortedBlogs = blogsTemp.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  // add a new blog obj
  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      // saves blog obj to db
      const returnedBlog = await blogService.create(blogObj)
      // adds the new blog obj to blogs array state
      setBlogs(blogs.concat(returnedBlog))
      displayNotification(`${returnedBlog.title} added`, false)
    } catch (exception) {
      displayNotification('adding a new blog post failed', true)
    }
  }

  // update a blog obj
  const updateBlog = async (blogId, blogObj) => {
    try {
      // saves updated blog obj to db
      const updatedBlog = await blogService.update(blogId, blogObj)
      // new blogs array: old blog obj replaced with new
      const updatedBlogs = blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
      // sorts blogs array by number of likes
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      // saves new blogs state
      setBlogs(sortedBlogs)
      displayNotification('blog successfully updated', false)
    } catch (exception) {
      displayNotification('updating blog post failed', true)
    }
  }

  // remove a blog obj
  const removeBlog = async (blogId) => {
    try {
      // removes blog obj with matching id from db
      await blogService.remove(blogId)
      // new blogs array without deleted obj
      const updatedBlogs = blogs.filter(b => (b.id !== blogId))
      setBlogs(updatedBlogs)
      displayNotification('blog successfully removed', false)
    } catch (exception) {
      displayNotification('removing blog post failed', true)
    }
  }

  // login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      displayNotification(`${user.username} succsessfully logged in`, false)
    } catch (exception) {
      displayNotification('wrong username or password', true)
    }
  }

  // logout handler
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    displayNotification('successfully signed out', false)
  }

  const displayNotification = (text, isError) => {
    setNotificationText(text)
    setError(isError)
    setTimeout(() => {
      setNotificationText(null)
      setError(false)
    }, 5000)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsList = () => (
      blogs.map(blog => <Blog key={blog.id} blog={blog} username={user.username} update={updateBlog} remove={removeBlog} />)
  )
  console.log(user)


  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification message={notificationText} isError={error} />
          <LoginForm 
            handleLogin={handleLogin} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            username={username} 
            password={password} 
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={notificationText} isError={error} />
          <p>{user.name} logged in
          <button type="button" onClick={() => handleLogout()}>logout</button>
          </p>
          {blogForm()}
          <br></br>
          {blogsList()}
        </div>
      }
    </div>
  )
}

export default App