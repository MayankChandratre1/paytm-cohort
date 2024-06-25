import React, { useState } from 'react'
import AuthCard from '../Components/AuthCard'
import Navbar from '../Components/Navbar'

const Auth = () => {
  const [signUp, setSignUp] = useState(true)
  return (
    <>
    <Navbar />
    <div className='grid h-screen place-items-center'>
        <div className='w-[50vw]'>
            <div className='grid grid-cols-2'>
                <button className={`relative  ${signUp ? "bg-black text-white shadow-xl top-3 rounded-br-xl" : "bg-gray-200 text-black top-0 rounded-b-none"} px-3 py-3 font-bold text-xl rounded-xl  transition-all duration-500 ease-linear`} onClick={()=> setSignUp(true)}>Sign Up</button>
                <button className={`relative  ${!signUp ? "bg-black text-white shadow-xl top-3 rounded-bl-xl" : "bg-gray-200 text-black top-0 rounded-b-none"} px-3 py-3 font-bold text-xl rounded-xl  transition-all duration-500 ease-linear`} onClick={()=> setSignUp(false)}>Log In</button>
            </div>
            <AuthCard signup={signUp} />    
        </div>
    </div>
    </>
  )
}

export default Auth