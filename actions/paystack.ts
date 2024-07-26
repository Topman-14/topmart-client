import { Product } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'

export const createOrder = async (items: Product[], metadata: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            products: items.map((item) => ({ id: item.id, quantity: item.quantity })),
            metadata
        });

        if (response.status === 200) {
            return response.data;
        } else {
            toast.error(response.data || 'Failed to create order. Please try again.');
            return null;
        }
    } catch (error: any) {
        const errorMessage = error.response?.data || 'An error occurred while creating the order.';
        toast.error(errorMessage);
        console.error(error); 
        return null;
    }
}

export const fufillOrder = async (orderId: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/webhook/paystack`, { orderId })
    return response.data
}