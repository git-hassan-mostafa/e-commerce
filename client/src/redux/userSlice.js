import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: 'idle',
    error: '',
  },
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers(builder) {
    builder.
      addCase(fetchUser.pending, (state, action) => {
        state.status = 'loading'
      }).addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded',
          state.user = action.payload
      }).addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('/api/v1/user', {
    credentials: 'include'
  })
  const data = await response.json()
  console.log(data)
  return data
})
export const { logout , toggleSideBar } = userSlice.actions

export default userSlice.reducer