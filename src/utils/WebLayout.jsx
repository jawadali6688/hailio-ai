import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function WebLayout() {
  return (
    <div>
      <Navbar />
      <div >
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
