import React from 'react'

import { Outlet } from 'react-router-dom'
import AdminNav from '../components/admin/AdminNav'


export default function AdminLayout() {
  return (
    <div>
      <AdminNav />
      <div >
        <Outlet />
      </div>
      <div>

      </div>
    </div>
  )
}
