import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import BlogContent from './components/BlogContent'
import blogService from './services/blogs'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationSlice'
import Message from './components/Message'
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogSlice'
import { fetchUsers } from './reducers/userSlice'
import { loginUser, logout as logoutUser, setUser } from './reducers/authSlice'
import { Container, Button } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.users)

  const blogFormRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      dispatch(fetchBlogs())
    }
  }, [dispatch, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const notify = (message, type = 'success') => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 2000)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await dispatch(createBlog(blogObject)).unwrap()
      blogFormRef.current.toggleVisibility()
      notify(
        `Uusi blogi "${newBlog.title}" kirjoittajalta ${newBlog.author} lisätty`
      )
      dispatch(fetchUsers())
    } catch (error) {
      notify('Virhe blogia luotaessa', 'error')
    }
  }

  const handleDeleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (window.confirm(`Poistetaanko ${blogToDelete.title} ?`)) {
      try {
        await dispatch(deleteBlog(id)).unwrap()
        notify(`Blogi "${blogToDelete.title}" poistettu onnistuneesti`)
        dispatch(fetchUsers())
      } catch (error) {
        notify('Virhe blogin poistaessa', 'error')
      }
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      await dispatch(updateBlog(updatedBlog)).unwrap()
      notify(`Tykkäsit blogista: "${blog.title}"`)
      dispatch(fetchUsers())
    } catch (error) {
      notify('Tykkäyksen päivittäminen epäonnistui', 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const resultAction = await dispatch(loginUser({ username, password }))
      if (loginUser.fulfilled.match(resultAction)) {
        notify(`Tervetuloa ${username}!`)
        navigate('/blogs')
      } else {
        notify(resultAction.payload || 'Kirjautuminen epäonnistui', 'error')
      }
      dispatch(fetchUsers())
    } catch (error) {
      notify('Odottamaton virhe kirjautumisessa', 'error')
    }
    setUsername('')
    setPassword('')
  }

  const logout = () => {
    dispatch(logoutUser())
    navigate('/')
    notify('Kirjauduttu ulos')
    dispatch(fetchUsers())
  }

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  //console.log('store:', users)
  //console.log('store:', blogs)
  return (
    <Container>
      <div>
        <div
          style={{
            backgroundColor: 'lightgreen',
            padding: '10px',
            color: 'black',
          }}
        >
          {user && (
            <>
              <Link style={padding} to="/">
                home
              </Link>

              <Link style={padding} to="/blogs">
                blogs
              </Link>
              <Link style={padding} to="/users">
                users
              </Link>
              <span>
                <em>{user.name}</em> kirjautuneena
              </span>
            </>
          )}
        </div>
        <Message message={notification.message} type={notification.type} />
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                loginForm()
              ) : (
                <div>
                  <h2>Tervetuloa blogisivustolle</h2>
                  <h3>Käyttäjä: </h3>
                  <h4>
                    <strong>{user.username}</strong>
                  </h4>
                  <br />
                  <br />
                  <Button variant="contained" color="primary" onClick={logout}>
                    Kirjaudu ulos
                  </Button>
                </div>
              )
            }
          />
          <Route
            path="/blogs"
            element={
              <div>
                <h2>Kaikki blogit</h2>
                {sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleLike={handleLike}
                    handleDelete={handleDeleteBlog}
                  />
                ))}
                <Togglable buttonLabel="Lisää blogi" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
              </div>
            }
          />
          <Route
            path="/users"
            element={
              <div>
                <h2>Käyttäjät ja blogimäärät</h2>
                <ul>
                  {users &&
                    users.map((u) => (
                      <li key={u.id}>
                        <Link to={`/users/${u.id}`} style={{ marginRight: 10 }}>
                          {u.username}
                        </Link>
                        {u.blogs.length} blogia
                      </li>
                    ))}
                </ul>
              </div>
            }
          />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/blogs/:id" element={<BlogContent />} />
        </Routes>
      </div>
    </Container>
  )
}

const padding = {
  padding: 5,
}

export default App
