import { useParams, useMatch, Link } from 'react-router-dom'

const User = ({ users }) => {
  const matchUserProfile = useMatch('/users/:id')
  const { id } = useParams()
  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <div>
      {matchUserProfile && <h3>{user.username} profiili</h3>}
      <h3>Blogit:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
