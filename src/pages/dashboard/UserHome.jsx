import React, { useState } from 'react'
import UserNav from './UserNav'
import Dashboard from '../UserDashboard'
import VoicePlayer from './VoicePlayer'
import { useSelector } from 'react-redux'

export default function UserHome() {
  const [tab, setTab] = useState("text_to_speech")
  const user = useSelector(auth => auth.auth.userData)

  return (
    <div className='bg-gray-900 '>
      <UserNav tab={tab} setTab={setTab} />
      <div className='py-2 ml-10 text-white flex flex-col gap-1'>
        <h1 className='text-xl font-bold'>Welcome {user?.fullName}</h1>
        <h1 className='text-md text-gray-200'>Hey folks, We are happy to see you!</h1>
        {/* <h3>If you want testing contact with us!</h3> */}
      </div>
    <Dashboard tab={tab} />
    
    </div>
  )
}
