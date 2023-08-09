import React from 'react'
import CongratsInner from "../Components/Congrats-Components/CongratsInner";


const CongratsScreen = () => {
  return (
    <div className="h-screen w-screen">
      <div className='border-b-2 w-full h-10 md:h-20 px-10'>
      <img
            src="https://ik.imagekit.io/k3m4pqzpmlr/Logo/mystay-logo-removebg-preview_s7Qj1Ibh3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655707681416"
            // src="https://ik.imagekit.io/k3m4pqzpmlr/Hotel_pictures/mystay-logo-removebg-preview_Gu-jhBpNX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656660679160"
            alt="mystay"
            className="h-10 md:h-20"
          />
      </div>
        <CongratsInner />
    </div>
  )
}

export default CongratsScreen
