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
    <form className='blogForm' id='blog-form' onSubmit={addBlog}>
      <div>
        title:
        <input
          id='blog-title-input'
          value={newBlogTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          id='blog-author-input'
          value={newBlogAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          id='blog-url-input'
          value={newBlogUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button id='create-button' type="submit">create</button>
    </form>
  )
}

export default BlogForm