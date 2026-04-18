import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  instanceAxios  from '../../api/axios'
import type { loginSchemaType } from '@/schemas/loginSchema'

const loginUser = createAsyncThunk(
  'user/login',
  async(data: loginSchemaType) => {
    const response = await instanceAxios.post("/login", data)
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)
    return response.data
  }

)

const initialState = {
    token: localStorage.getItem("accessToken"),
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isLoading: false,
isError: false
}
export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   logout: (state) => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken")
    state.isAuthenticated = false
   }
    },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
      state.isAuthenticated = false

    })
        builder.addCase(loginUser.fulfilled, (state, action) => {
          state.token = action.payload.accessToken
      state.isLoading = false
      state.isAuthenticated = true

    })
        builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false
      state.isAuthenticated = false

    })

  }
})

export const { logout }= auth.actions

export default auth.reducer
export {loginUser}