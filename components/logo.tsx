import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
   <Image height={36} width={36} src={'/topmart.svg'} alt='Logo' />
  )
}

export default Logo