import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const canDelete = blog.user && user && blog.user.username === user.username

  return (
    <div style={blogStyle} data-testid={'blogTest'} className="blog">
      <>
        <span className="title">{blog.title}</span>
        <span> kirjoittanut: {blog.author}</span>
        <button onClick={() => setShowDetails(!showDetails)} style={toggleBtn}>
          {showDetails ? 'piilota' : 'näytä'}
        </button>
      </>
      {showDetails && (
        <>
          <div>
            <p>{blog.url}</p>
            <span>
              tykkäykset: <span className="likes">{blog.likes}</span>{' '}
            </span>
            <button onClick={() => handleLike(blog)} style={toggleBtn}>
              tykkää
            </button>
          </div>
          <div>
            <br />
            {canDelete && (
              <button onClick={() => handleDelete(blog.id)} style={deleteBlog}>
                poista
              </button>
            )}
          </div>
          <br />
          Lisännyt: <em>{blog.user.username}</em>
        </>
      )}
    </div>
  )
}

const blogStyle = {
  padding: 10,
  border: '1px solid green',
  marginBottom: 5,
}
const deleteBlog = {
  color: 'red',
  backgroundColor: 'yellow',
  borderRadius: 10,
  borderColor: 'red',
}
const toggleBtn = {
  color: 'lightgreen',
  backgroundColor: 'darkgreen',
  borderRadius: 10,
  borderColor: 'lightgreen',
}

export default Blog
