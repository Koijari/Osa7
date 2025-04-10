import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  return await blogService.getAll()
})

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData, { rejectWithValue }) => {
    try {
      const newBlog = await blogService.create(blogData)
      return newBlog
    } catch (error) {
      return rejectWithValue(error.response.data || 'Virhe blogin luonnissa')
    }
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (updatedBlog) => {
    const response = await blogService.update(updatedBlog.id, updatedBlog)
    return response
  }
)

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await blogService.remove(id)
  return id
})

export const addComment = createAsyncThunk(
  'blogs/addComment',
  async ({ blogId, comment }) => {
    const updatedBlog = await blogService.addComment(blogId, comment)
    return updatedBlog
  }
)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (_, action) => action.payload)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        return state.map((b) =>
          b.id === action.payload.id ? action.payload : b
        )
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((b) => b.id !== action.payload)
      })
      .addCase(addComment.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        )
      })
  },
})

export default blogSlice.reducer
