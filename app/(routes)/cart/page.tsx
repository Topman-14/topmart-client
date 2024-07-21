"use client";
import CartItem from '@/components/cart-item';
import Summary from '@/components/summary';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import { FC, Suspense } from 'react'

interface CartPageProps {

}

const CartPage:FC<CartPageProps> = () => {

    const cart = useCart()

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className='text-3xl font-bold text-black'>Shopping Cart ({cart.items.length})</h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length === 0 && <p className='text-neutral-500'>No Items added to cart</p>}
                            <ul>
                                {cart.items.map((items) => (
                                    <CartItem key={items.id} data={items} />
                                ))}
                            </ul>
                        </div>
                        <Suspense>
                            <Summary />
                        </Suspense>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartPage