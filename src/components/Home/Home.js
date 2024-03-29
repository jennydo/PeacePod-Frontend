import React from 'react'
import './Home.css'
import BouncyText from './BouncyText'
import { ButtonCards } from "./Footer"

const Home = () => {
  return (
    <div>
        {/* App name */}
        <div className='app-name__container'>
          <BouncyText text={"PeacePod"} />
          <div className='app-intro__container'>
            <h1>PeacePod: bridging gaps, healing minds</h1>
            <p className='app-intro__description'>A website designed to foster connections between individuals from similar 
            backgrounds in mental state for supportive and meaningful conversations. 
            We understand the importance of finding sympathy and empathy in others 
            who share similar experiences, which is why this app is here to bridge the gap 
            and provide a platform for genuine connection and support.</p>
          </div>
          <ButtonCards />
        </div>
    </div>
  )
}

export default Home