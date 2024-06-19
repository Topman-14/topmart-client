import React from 'react'
import Logo from './logo'

const MainNav = () => {
  return (
    <header className='flex space-between py-2 px-3 transition-all bg-[#ffffff8c] backdrop-blur-md rounded-xl'>
        <div className='flex gap-3 items-center'>
          <Logo />
          <h1 className='font-semibold text-xl'>Topmart</h1>
        </div>

        <div>

        </div>

    </header>
  )
}

export default MainNav