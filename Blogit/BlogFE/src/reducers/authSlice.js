import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      return user
    } catch (error) {
      return rejectWithValue('Virheellinen käyttäjätunnus tai salasana')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      window.localStorage.clear()
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
