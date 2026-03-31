import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    token: localStorage.getItem("accessToken"),
    isAuthenticated: false
}
export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload
      localStorage.setItem("accessToken", action.payload)
      state.isAuthenticated = !!localStorage.getItem("accessToken")
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem("accessToken")
    },
 
  },
})

export const { loginSuccess, logout }= auth.actions

export default auth.reducer