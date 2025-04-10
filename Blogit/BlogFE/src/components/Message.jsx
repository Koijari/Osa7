import { Alert } from '@mui/material'

const Message = ({ message, type }) => {
  if (!message) return null

  return (
    <div>
      {message && (
        <Alert severity={type} data-testid="notification">
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Message
