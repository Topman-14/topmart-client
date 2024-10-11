import React from 'react'
import Logo from './logo'

const Footer = () => {
  return (
    <footer className='bg-white border-t'>
        <div className='mx-auto py-10'>
            <p className='text-center text-xs text-black'>&copy; {new Date().getFullYear()} Tope Akinkuade, All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer