import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renderöi sisältö', () => {
  const blog = {
    title: 'title testattu react-testing-libraryllä',
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText('title testattu react-testing-libraryllä')
  expect(element).toBeDefined() // elementtitesti
})

test('näyttää vain title ja author aluksi', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Kirjoittaja',
    url: 'http://esimerkki.fi',
    likes: 5,
    user: {
      username: 'testaaja',
      name: 'Testikäyttäjä',
    },
  }
  render(<Blog blog={blog} user={{ username: 'testaaja' }} />)
  expect(screen.getByText('Testiblogi')).toBeDefined()
  expect(screen.getByText('Kirjoittaja')).toBeDefined()
  expect(screen.queryByText('http://esimerkki.fi')).toBeNull() // ei näy aluksi
  expect(screen.queryByText('tykkäykset: 5')).toBeNull() // ei näy aluksi
})

test('url, likes ja username näkyviin näytä-painikkeella', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Kirjoittaja',
    url: 'http://esimerkki.fi',
    likes: 5,
    user: {
      username: 'testaaja',
      name: 'Testikäyttäjä',
    },
  }
  render(<Blog blog={blog} user={{ username: 'testaaja' }} />)
  const user = userEvent.setup()
  const button = screen.getByText('näytä') // napin teksti
  await user.click(button)
  expect(screen.getByText('http://esimerkki.fi')).toBeDefined()
  expect(screen.getByText('tykkäykset: 5')).toBeDefined()
  expect(screen.getByText('testaaja')).toBeDefined() // username blogin lisääjänä
})

test('tykkäyspainikkeen painaminen kahdesti kutsuu event handleria kahdesti', async () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'http://testi.fi',
    likes: 0,
    user: {
      username: 'testaaja', // namea ei renderöidä Blog.jsx
    },
  }

  const currentUser = {
    username: 'testaaja',
  }

  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()

  render(
    <Blog
      blog={blog}
      user={currentUser}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
    />
  )

  const user = userEvent.setup()

  // tykkää-painike ei näy oletuksena => painetaan ensiksi näytä
  const viewButton = screen.getByText('näytä')
  await user.click(viewButton)

  // tykkää tuplaclick
  const likeButton = screen.getByText('tykkää')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike).toHaveBeenCalledTimes(2) // kahdesti painettu
})

test('uusi blogi lisätään => onSubmit vastaa oikeilla arvoilla', async () => {
  const mockCreateBlog = vi.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const user = userEvent.setup()

  // kentät täyteen (isRequired)
  const titleInput = screen.getByPlaceholderText('otsikko')
  const authorInput = screen.getByPlaceholderText('kirjoittaja')
  const urlInput = screen.getByPlaceholderText('nettiosoite')

  await user.type(titleInput, 'Testiblogi')
  await user.type(authorInput, 'Testaaja')
  await user.type(urlInput, 'http://testi.fi')

  // lisää-painike click
  const createButton = screen.getByText('lisää')
  await user.click(createButton)

  // tarkistukset
  expect(mockCreateBlog).toHaveBeenCalledTimes(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'http://testi.fi',
  })
})
