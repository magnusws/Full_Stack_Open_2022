import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  username,
  update,
  remove
}) => {
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
    <div className="blogDetails">
      <br/>
      <span className="blogUrl"> {blog.url} </span>
      <br/>
      <span className="blogLikes"> likes {blog.likes} </span> <button className="blogLikeButton" onClick={() => updateLikes()}>like</button>
      <br/>
      <span className="blogUserName"> {blog.user.name} </span>
      <br/>
      {createdByUser && <button onClick={() => removeBlog()}>remove</button>}
    </div>
  )

  return (
    <div style={blogStyle}>
      <table bordered="true">
        <tbody>
          <tr>
            <td>
              <div className="blog">
                <span className="blogTitle"> {blog.title} </span>
                <span className="blogAuthor"> {blog.author} {' '} </span>
                <button className="blogDetailsButton" onClick={() => setViewDetails(!viewDetails)}>
                  {viewDetails ? 'hide' : 'view'}
                </button>
                {viewDetails && blogDetails()}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

Blog.displayName = 'Blog'

export default Blog