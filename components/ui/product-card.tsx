'use client'

import { Product } from "@/types"
import Image from "next/image"
import { FC, MouseEventHandler } from "react"
import IconButton from "@/components/ui/icon-button"
import { Expand, ShoppingCart, ShoppingCartIcon } from "lucide-react"
import Currency from "./currency"
import { useRouter } from "next/navigation"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCardProps {
    data: Product
}

const ProductCard: FC<ProductCardProps> = ({
    data
}) => {
    const router = useRouter()

    const previewModal = usePreviewModal()
    const cart = useCart()

    const handleClick = () => {
        router.push(`/product/${data.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        previewModal.onOpen(data);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        
        cart.addItem(data)
    }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
            <Image
                src={data?.images?.[0]?.url}
                fill
                alt="Product image"
                className="object-cover rounded-lg aspect-square"
            />
            <div className="opacity-0 group-hover:opacity-100 transition w-full absolute px-6 bottom-5">
                <div className="flex gap-x-6 justify-center">
                    <IconButton 
                        onClick={onPreview} 
                        icon={<Expand size="20" className="text-gray-600" />}
                     />
                    <IconButton 
                        onClick={onAddToCart} 
                        icon={<ShoppingCartIcon size="20" className="text-gray-600" />}
                     />
                </div>
            </div>
        </div>
        <div>
            <p className="font-semibold text-lg">
                {data.name}
            </p>
            <p className="text-gray-500 text-sm">
                {data.category.name}
            </p>
        </div>
        <div className="flex items-center justify-between">
            <Currency value={data?.price} />
        </div>
    </div>
  )
}

export default ProductCard