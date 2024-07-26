'use client'
import { Product } from '@/types'
import React, { FC } from 'react'
import Currency from './ui/currency'
import Button from './ui/custom-button'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import useCart from '@/hooks/use-cart';
import { usePathname } from 'next/navigation'
import IconButton from './ui/icon-button'


interface InfoProps {
    data: Product
}

const Info: FC<InfoProps> = ({
    data
}) => {
  const pathname = usePathname()  
  const cart = useCart()

  const isProductPage = pathname.includes('/product/');

  const qtyInCart = cart.items.find((product) => product.id === data.id)?.quantity;

  const outOfStock = (
    <p className="font-semibold p-1 text-xs rounded-md text-white bg-red-500 px-2">Out of stock</p>
  )

  const inventoryLeft = (
    <p className="font-semibold p-1 text-sm rounded-md text-white bg-orange-600 px-2">{data?.quantity} left</p>
  )

  const qtyPicker = (
    <div className="flex items-center gap-x-2 rounded-3xl border py-3 px-4">
        <IconButton
            className="p-1 rounded-md"
            onClick={(e) => {
                e.stopPropagation();
                cart.decreaseQty(data.id);
            }}
            icon={<Minus size="15" />}
        />
        <p className="font-semibold">
          {qtyInCart + ' '}in cart
        </p>
        <IconButton
            className="p-1 rounded-md"
            disabled={data.quantity === qtyInCart}
            onClick={(e) => {
                e.stopPropagation();
                cart.increaseQty(data.id);
            }}
            icon={<Plus size="15" />}
        />
    </div>
  )

  const isInCart = !!cart.items.find((product) => product.id === data.id);

  return (
    <div>
      <h1 className={`text-3xl font-bold text-gray-900 ${isProductPage? ' sm:hidden md:block ' : ''}`}>{data.name}</h1>
      <div className="mt-3 items-end flex justify-between">
        <span className='flex items-center gap-2 justify-between w-full'>
          {data.quantity > 0 ? inventoryLeft : outOfStock}
          <Currency value={data.price} />
        </span>
      </div>
      { isProductPage &&
          <div className="my-5 items-center justify-center flex gap-x-3">
            { !isInCart ?
                <Button 
                  disabled={data.quantity === 0}
                  onClick={() => cart.addItem(data)}
                  className='flex items-center gap-x-2'>
                  Add to cart
                  <ShoppingCart />
                </Button> 
              : qtyPicker
            }
          </div>
      }
      <hr className="my-4" />
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className='flex gap-2 items-center'>
            <p>{data?.color?.name}</p>
            <div className={`size-4 rounded-md border border-gray-600`} style={{backgroundColor: data?.color?.value}} />
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className='whitespace-break-spaces'>{
            isProductPage? data?.description : 
           data?.description?.slice(0, 100) + '...'}</div>
        </div>
      </div>
      { !isProductPage &&
          <div className="mt-5 items-center justify-end flex gap-x-3">
          <Button 
            disabled={data.quantity === 0}
            onClick={() => cart.addItem(data)}
            className='flex items-center gap-x-2'>
            Add to cart
            <ShoppingCart />
          </Button>
        </div>
      }
    </div>
  )
}

export default Info