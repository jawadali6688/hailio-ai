import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import WebLayout from "./utils/WebLayout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./components/ForgotPassword"
import InfoAlert from "./components/InfoAlert"
import UserDashboard from "./pages/UserDashboard"
import UserHome from "./pages/dashboard/UserHome"
import ScrollToTop from "../ScrollToTop"
import UserAuth from "../UserAuth"
import { Toaster } from "react-hot-toast"

function App() {
  
  return (
   <>
   <BrowserRouter>
   <ScrollToTop />
   <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "darkgray", // Dark blue background
      color: "white", // White text
      borderRadius: "8px",
      padding: "12px",
      fontSize: "16px",
    },
    success: {
      style: {
        background: "#22c55e", // Green for success
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "#ef4444", // Red for errors
        color: "#fff",
      },
    },
  }}
/>
  <Routes >
    <Route path="" element = {<WebLayout />} >
    <Route path="/" element = {<Home />} />
    <Route path="/login" element = {<Login />} />
    <Route path="/signup" element = {<Signup />} />
    <Route path="/forgot_password" element = {<ForgotPassword />} />
    </Route>
    <Route path="/user_dashboard" element = {
      <UserAuth authentication = {false}>
        <UserHome />
      </UserAuth>
    } />
  </Routes>
   
   </BrowserRouter>
   </>
  )
}

export default App
