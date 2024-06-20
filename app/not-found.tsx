import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='size-full h-[calc(100vh-170px)] flex items-center justify-center flex-col bg-slate-50 text-center gap-2'>
        <h3 className="text-7xl font-semibold">404</h3>
        <p>The requested page cannot be found!
        </p>
        <Link href={'/'} className='text-primary underline'>
          <Button>
            Go Home
          </Button>
        </Link>
    </div>
  )
}

export default NotFound