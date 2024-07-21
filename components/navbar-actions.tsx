'use client'
import React, { useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/custom-button'
import useCart from '@/hooks/use-cart'

const NavbarActions = () => {

  const [isMounted, setIsMounted] = React.useState(false)
  const cart = useCart()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])


  if (!isMounted) return null;
    
  return (
    <div className='flex items-center gap-x-4 ml-auto'>
        <Button 
          onClick={() => router.push('/cart')}
          className='flex items-center rounded-full bg-black px-4 py-2'>
            <ShoppingBag size={20} color='white'/>
            <span className='ml-2 text-sm font-medium'>
                {cart.items.length}
            </span>
        </Button>
    </div>
  )
}

export default NavbarActions