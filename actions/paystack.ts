import { cleanUrl } from '@/lib/utils';
import { Product } from '@/types'
import axios from 'axios'
import toast from 'react-hot-toast'

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
const baseUrl = cleanUrl(apiUrl)

export const createOrder = async (items: Product[], metadata: any) => {
    try {
        const response = await axios.post(`${apiUrl}/checkout`, {
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
    const response = await axios.post(`${baseUrl}webhook/paystack`, { orderId })
    return response.data
}