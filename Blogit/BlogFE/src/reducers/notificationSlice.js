import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const { message, type } = action.payload
      state.message = message
      state.type = type
    },
    clearNotification(state) {
      state.message = ''
      state.type = null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
