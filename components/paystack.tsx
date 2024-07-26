import { FC, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { PaystackButton } from 'react-paystack'
import Image from 'next/image'
import PaystackLogo from '@/assets/img/paystack.svg'


interface PaystackBtnProps {
    data: any,
    text?: string,
    children: ReactNode
}

const publickKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

const PaystackBtn: FC<PaystackBtnProps> = ({
    data,
    text,
    children
}) => {
    const fufilOrder = async () => {

        toast('Payment successful!', { duration: 4000 })
    }
  return (
    <PaystackButton 
        {...data}
        onSuccess={() => fufilOrder()}
        onClose={() => toast.error('Payment cancelled!', { duration: 4000 })}
        publickKey={publickKey}
        className='bg-black text-white rounded-full px-4 py-3 font-semibold flex gap-2 items-center mt-6 w-full justify-center hover:bg-gray-800 transition'
     >
        
        {children}
     </PaystackButton>
  )
}

export default PaystackBtn