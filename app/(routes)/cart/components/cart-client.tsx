'use client'
import CartItem from '@/components/cart-item';
import Summary from '@/components/summary';
import { FC, Suspense } from 'react'
import useCart from '@/hooks/use-cart';

interface CartClientProps {
    stocks: {id: string, stock: number}[]
}

const CartClient:FC<CartClientProps> = ({
    stocks
}) => {

    const cart = useCart()

  return (
    <>
        <h1 className='text-3xl font-bold text-black'>Shopping Cart ({cart.items.length})</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
                {cart.items.length === 0 && <p className='text-neutral-500'>No Items added to cart</p>}
                <ul>
                {cart.items.map((item) => {
                            const stock = stocks.find(product => product.id === item.id);
                            if (!stock) {
                                console.warn(`Stock information not found for item id: ${item.id}`);
                                return null; 
                            }
                            return (
                                <CartItem 
                                    key={item.id} 
                                    data={item}
                                    stock={stock}
                                />
                            );
                        })}
                </ul>
            </div>
            <Suspense>
                <Summary />
            </Suspense>
        </div>
    </>
  )
}

export default CartClient