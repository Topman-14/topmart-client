import Container from '@/components/ui/container';
import CartClient from './components/cart-client';
import getProducts from '@/actions/get-products';

export const revalidate = 0

const CartPage = async () => {

    const products = await getProducts({})

    const currentStocks = products.map(product => (
        {
            id: product.id,
            stock: product.quantity
        }))

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <CartClient stocks={currentStocks} />
                </div>
            </Container>
        </div>
    )
}

export default CartPage