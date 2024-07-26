import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import Gallery from '@/components/gallery'
import Info from '@/components/info'
import ProductList from '@/components/product-list'
import Container from '@/components/ui/container'
import React, { FC } from 'react'


// export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const dynamicParams = false

export const revalidate = 600 //revalidate every 10mins
interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: FC<ProductPageProps> = async ({
    params
}) => {
    const product = await getProduct(params.productId)

    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
    })

    return (
        <div className='bg-white'>
            <Container>
                <div className='px-4 py-10 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:hidden sm:block hidden mb-4 font-bold text-gray-900'>{product.name}</h1>
                    <div className='md:grid md:grid-cols-2 items-start lg:gap-x-8 md:gap-x-6'>
                        <Gallery images={product.images} />
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 md:mt-0">
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className='my-10'/>
                    <ProductList title='You might also like' items={suggestedProducts.filter(item => item.id != product.id)} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage