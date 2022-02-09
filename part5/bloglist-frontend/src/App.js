import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationText, setNotificationText] = useState(null)
  const [error, setError] = useState(false)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('test')

  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    
    const blogObj = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try {
      const returnedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      displayNotification(`${returnedBlog.title} added`, false)

    } catch (exception) {
      displayNotification('adding a new blog post failed', true)
    }
  }

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogsList = () => (
      blogs.map(blog => <Blog key={blog.id} blog={blog} />)
  )


  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification message={notificationText} isError={error} />
          {loginForm()}
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification message={notificationText} isError={error} />
          <p>{user.name} logged in
          <button type="button" onClick={() => handleLogout()}>logout</button>
          </p>
          <h2>create new</h2>
          {blogForm()}
          {blogsList()}
        </div>
      }
    </div>
  )
}

export default App