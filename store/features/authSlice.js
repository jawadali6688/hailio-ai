import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  userData: []
}

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload?.user
      console.log(action.payload)
      localStorage.setItem("accessToken", action.payload?.accessToken)
    },
    logoutUser: (state, action) => {
      state.userData = action.payload
      localStorage.clear()
    }
  }
})

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer