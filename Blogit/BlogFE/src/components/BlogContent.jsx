import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { addComment } from '../reducers/blogSlice'
import { Container, TextField, Button } from '@mui/material'

const BlogContent = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

  if (!blog) {
    return <div>Blogia ei löytynyt.</div>
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment({ blogId: blog.id, comment }))
    setComment('')
  }

  return (
    <Container>
      <div>
        <h2>{blog.title}</h2>
        <p>
          <strong>Kirjoittaja:</strong> {blog.author}
        </p>
        <p>
          <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          <strong>Tykkäyksiä:</strong> {blog.likes}
        </p>
        <p>
          <strong>Lisännyt:</strong> {blog.user.username || 'Tuntematon'}
        </p>
        <br />
        <h3>Kommentit</h3>
        <ul>
          {(blog.comments || []).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Lisää kommentti"
          />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Lisää kommentti
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default BlogContent
