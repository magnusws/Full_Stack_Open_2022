import React, { useState } from 'react'

const BlogForm = ({ 
  createBlog 
}) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm