"use client"
import { FC, useEffect, useState } from 'react'
import axios from "axios"
import Currency from '@/components/ui/currency'
import useCart from '@/hooks/use-cart'
import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { usePaystackPayment } from 'react-paystack';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PaystackLogo from '@/assets/img/paystack.svg'
import Button from './ui/custom-button'
import Image from 'next/image'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { HandCoins } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { createOrder, fufillOrder } from '@/actions/paystack'
import { LoadingButton } from './ui/loader-button'

const formSchema = z.object({
    name: z.string().min(1, 'required'),
    phone: z.string().min(1, 'required'),
    address: z.string().min(1, 'required'),
    email: z.string().email('Invalid email address'),
});

type PaymentFormValues = z.infer<typeof formSchema>;

const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';


const Summary = () => {
    const items = useCart((state) => state.items)
    const cart = useCart()
    const router = useRouter()
    const [showCheckout, setShowCheckout] = useState(false)
    const [orderLoading, setOrderLoading] = useState(false)

    const totalPrice = items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
            email: ''
        },
    });

    const onSuccess = async(reference: string) => {
        try{
            const response = await fufillOrder(reference)
            toast.success('Order Successful!')
            cart.removeAll()
            router.push('/')
            router.refresh()
        } catch(e) {
            console.error(e)
        } finally{
            setOrderLoading(false)
        }

    }
    
    const onClose = () => {
        toast.error('Payment cancelled!');
        setOrderLoading(false)
    }


    const initializePayment = usePaystackPayment({
        email: '',
        publicKey,
        metadata: {
        custom_fields: [
            ]
        },
    });

    const onSubmit = async (data: PaymentFormValues) => {

        const updatedPaymentDetails = {
            email: data.email,
            amount: totalPrice * 100,
            publicKey,
            metadata: {
                custom_fields: [
                    {
                        display_name: 'Name',
                        variable_name: 'name',
                        value: data.name
                    },
                    {
                        display_name: 'Phone Number',
                        variable_name: 'phone',
                        value: data.phone
                    },
                    {
                        display_name: 'Address',
                        variable_name: 'address',
                        value: data.address
                    }
                ]
            }
        };
        setOrderLoading(true)
        const order = await createOrder(items, data);
        if(order){
            initializePayment({
                onSuccess: () => onSuccess(order.id),
                onClose,
                config: updatedPaymentDetails
            });
        } else {
            setOrderLoading(false)
        }
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
            {!showCheckout &&
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            className={'w-full mt-6 flex items-center justify-center gap-2 bg-green-900'}
                            disabled={items.length === 0}
                            onClick={() => setShowCheckout(true)}
                        >
                            <Image src={PaystackLogo} alt="Paystack" width={20} height={20} />
                            Paystack Checkout
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                        {items.length > 0 ? `We'll need your order details here` : 'You have no items in your cart'}
                    </TooltipContent>
                </Tooltip>
            }
            {showCheckout &&
                <Form {...form}>
                    <h3 className='mt-6 font-semibold'>Order details</h3>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 grid md:grid-cols-2 md:p-4 md:border rounded-2xl gap-2 md:gap-4 animate-in zoom-in-95 fade-in-15">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className='lg:col-span-2'>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+234 712 345 6789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='lg:col-span-2'>
                                    <FormLabel>Pickup Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="5, John Doe Street, Lekki, Lagos, Nigeria" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <LoadingButton
                        onClick={form.handleSubmit(onSubmit)}
                        loading={orderLoading}
                        className={'w-full mt-6 flex items-center justify-center gap-2 rounded-full py-4'}
                        type="submit"
                    >
                        {!orderLoading ? 
                        <>
                            <HandCoins />
                            Pay Now
                        </> : <p className="font-semibold">Loading</p>
                        }
                    </LoadingButton>
                </Form>
            }
        </div>
    )
}

export default Summary
