import React from 'react'
import Logo from './logo'

const Footer = () => {
  return (
    <footer className='w-full bg-primary rounded-t-2xl p-3'>
      <div className='flex gap-3'>
        <Logo />
        <h1 className='font-semibold'>Topmart</h1>
      </div>
        <div>
            <p className='text-center text-white'>&copy; {new Date().getFullYear()} Tope Akinkuade, All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer