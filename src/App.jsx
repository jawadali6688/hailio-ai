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

function App() {
  
  return (
   <>
   <BrowserRouter>
  <Routes >
    <Route path="" element = {<WebLayout />} >
    <Route path="/" element = {<Home />} />
    <Route path="/login" element = {<Login />} />
    <Route path="/signup" element = {<Signup />} />
    <Route path="/forgot_password" element = {<ForgotPassword />} />
    </Route>
    <Route path="/user_dashboard" element = {<UserHome />} />
  </Routes>
   
   </BrowserRouter>
   </>
  )
}

export default App
