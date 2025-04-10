import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/users'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await userService.getAll()
  return users
})

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default userSlice.reducer
