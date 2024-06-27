'use client'
import { Product } from '@/types'
import React, { FC } from 'react'
import Currency from './ui/currency'
import Button from './ui/custom-button'
import { ShoppingCart } from 'lucide-react'
import useCart from '@/hooks/use-cart';


interface InfoProps {
    data: Product
}

const Info: FC<InfoProps> = ({
    data
}) => {

  
  const cart = useCart()

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className="mt-3 items-end flex justify-between">
        <span className='text-2xl text-green-800'>
          <Currency value={data.price} />
        </span>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Color:</h3>
          {/* <div>{data?.size?.name}</div> */}
          <div className='flex gap-2 items-center'>
            <p>{data?.color?.name}</p>
            <div className={`h-5 w-5 rounded-full border border-gray-600`} style={{backgroundColor: data?.color?.value}} />
          </div>
        </div>
      </div>
      <div className="mt-10 items-center flex gap-x-3">
        <Button 
          onClick={() => cart.addItem(data)}
          className='flex items-center gap-x-2'>
          Add to cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  )
}

export default Info