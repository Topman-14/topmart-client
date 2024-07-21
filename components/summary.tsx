"use client"
import { FC, useEffect } from 'react'
import axios from "axios"
import Currency from '@/components/ui/currency'
import Button from '@/components/ui/custom-button'
import useCart from '@/hooks/use-cart'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface SummaryProps {

}

const Summary:FC<SummaryProps> = () => {

    const searchParams = useSearchParams()

    const items = useCart((state) => state.items)
    const removeAll = useCart((state) => state.removeAll)
    const cart = useCart()

    console.log(cart.items)

    useEffect(() => {
        if(searchParams.get('success')) {
            toast.success('Order placed successfully');
            removeAll();
        }
        if(searchParams.get('canceled')) {
            toast.error('Something went wrong!');
        }
    }, [searchParams, removeAll])

    const totalPrice = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            products: items.map((item) => ({ id: item.id, quantity: item.quantity }))
        })

        window.location = response.data.url
    }

    return (
        <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Subtotal
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button 
                className={'w-full mt-6'} 
                disabled={items.length === 0}
                onClick={onCheckout}
                >
                Checkout
            </Button>
        </div>
    )
}

export default Summary