import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
   <Image height={40} width={40} src={'/topmart.svg'} alt='Logo' />
  )
}

export default Logo