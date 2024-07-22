import { Product } from '@/types'
import axios from 'axios'

export const createOrder = async (items: Product[], metadata: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        products: items.map((item) => ({ id: item.id, quantity: item.quantity })),
        metadata
    })
    return response.data
}

export const fufillOrder = async (orderId: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/webhook/paystack`, { orderId })
    return response.data
}