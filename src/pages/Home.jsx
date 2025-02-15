import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from './Features'
import MyPricing from '../components/MyPricing'
import Contact from './Contact'
import InfoAlert from '../components/InfoAlert'

export default function Home() {
  const homeText = 'Welcome Folks, We are happy to see you!'
  return (
<>
      <div className="min-h-screen bg-base-100">
     <InfoAlert message={homeText} />
      <Hero />
    </div>
    <div className=''>
    
        <HowItWorks />
    </div>
    <div>
        <Features />
    </div>
    <div>
        <MyPricing />
    </div>
    <div>
        <Contact />
    </div>
    </>
  )
}
