import PropTypes from 'prop-types'
import { Container, TextField, Button } from '@mui/material'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Container>
      <div>
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Käyttäjä"
              data-testid="käyttäjä"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              label="Salasana"
              data-testid="salasana"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            kirjaudu
          </Button>
        </form>
      </div>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
