import React, { useState } from 'react'
import { Container, TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h3>Lisää uusi blogi</h3>
        <div>
          otsikko
          <TextField
            data-testid="otsikko"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="otsikko"
          />
        </div>
        <div>
          kirjoittaja
          <TextField
            data-testid="kirjoittaja"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="kirjoittaja"
          />
        </div>
        <div>
          url
          <TextField
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="nettiosoite"
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          lisää
        </Button>
      </form>
    </Container>
  )
}

export default BlogForm
