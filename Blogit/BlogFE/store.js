import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './src/reducers/notificationSlice'
import blogReducer from './src/reducers/blogSlice'
import usersReducer from './src/reducers/userSlice'
import authReducer from './src/reducers/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
})

export default store
