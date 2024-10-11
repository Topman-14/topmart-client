import React from 'react'
import Logo from './logo'
import Container from './ui/container'
import Link from 'next/link'
import MainNav from './main-nav'
import NavbarActions from './navbar-actions'
import getBillboards from '@/actions/get-billboards'
import MobileMenu from './mobile-menu'
import { Jost } from 'next/font/google'

export const revalidate = 0;
const displayFont = Jost({ subsets: ["latin"] });

const Navbar = async () => {
  const billboards = await getBillboards();

  return (
    <header className='border-b-2 border-orange-500'>
        <Container>
          <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-2'>
            <Link href={'/'} className='flex items-center'>
              <Logo />
              <p className={`text-xl ml-1 ${displayFont.className}`}>Earl&apos;s Bistro</p>
            </Link>
            <MainNav data={billboards} />
            <NavbarActions />
            <MobileMenu data={billboards} />
          </div>
        </Container>
    </header>
  )
}

export default Navbar