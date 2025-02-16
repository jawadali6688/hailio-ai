import React from 'react'
import UserNav from './UserNav'
import Dashboard from '../UserDashboard'
import VoicePlayer from './VoicePlayer'
import { useSelector } from 'react-redux'

export default function UserHome() {
  const user = useSelector(auth => auth.auth.userData)

  return (
    <div className='bg-gray-900 min-h-screen'>
      <UserNav />
      <div className='py-2 ml-10 text-white flex flex-col gap-1'>
        <h1 className='text-xl font-bold'>Welcome {user?.fullName}</h1>
        <h1 className='text-sm text-red-600'>You are not able to Generate or Clone Voice, for access contact to Admin</h1>
      </div>
    <Dashboard />
    <VoicePlayer />
    </div>
  )
}
