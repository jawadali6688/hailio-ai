import React from 'react'
import UserNav from './UserNav'
import Dashboard from '../UserDashboard'
import VoicePlayer from './VoicePlayer'

export default function UserHome() {
  return (
    <div className='bg-gray-900 min-h-screen'>
      <UserNav />
    <Dashboard />
    <VoicePlayer />
    </div>
  )
}
