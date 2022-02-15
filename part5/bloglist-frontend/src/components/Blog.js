import React, { useState } from 'react'

const Blog = ({blog, username, update, remove}) => {
  const [viewDetails, setViewDetails] = useState(false)

  const createdByUser = (blog.user.username === username)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikes = () => {
    update(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog.id)
    }
  }

  const blogDetails = () => (
    <>
      <br/>
      {blog.url}
      <br />
      likes {blog.likes} <button onClick={() => updateLikes()}>like</button>
      <br/>
      {blog.user.name}
      <br/>
      {createdByUser && <button onClick={() => removeBlog()}>remove</button>}
    </>
  )

  return (
    <div style={blogStyle}>
      <table bordered="true">
        <tbody>
          <tr>
            <td>
              {blog.title} {blog.author}{' '}
              <button onClick={() => setViewDetails(!viewDetails)}>
                {viewDetails ? 'hide' : 'view'}
              </button>
              {viewDetails && blogDetails()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>  
  )
  
}

export default Blog