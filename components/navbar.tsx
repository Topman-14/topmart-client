import React from 'react'
import Logo from './logo'
import Container from './ui/container'
import Link from 'next/link'
import MainNav from './main-nav'
import getCategories from '@/actions/get-categories'
import NavbarActions from './navbar-actions'

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <header className='border-b'>
        <Container>
          <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
            <Link href={'/'} className='flex gap-2 items-center'>
              <Logo />
              <p className='font-bold text-xl'>Topmart</p>
            </Link>
            <MainNav data={categories} />
            <NavbarActions />
          </div>
        </Container>
    </header>
  )
}

export default Navbar