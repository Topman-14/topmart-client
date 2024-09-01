'use client'

import { Product } from "@/types"
import Image from "next/image"
import { FC, MouseEventHandler } from "react"
import IconButton from "@/components/ui/icon-button"
import { Expand, Minus, Plus, ShoppingCart, ShoppingCartIcon } from "lucide-react"
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

    const isInCart = !!cart.items.find((product) => product.id === data.id);

    const qtyInCart = cart.items.find((product) => product.id === data.id)?.quantity;

    const inventoryLeft = (
        <p className="font-semibold p-1 text-sm rounded-md text-white bg-gray-500 px-2">{data?.quantity} items</p>
    )

    const outOfStock = (
        <p className="font-semibold p-1 text-xs rounded-md text-white bg-red-500 px-2">Out of stock</p>
    )

    //using this qtyPicker and the two above in multiple places, should encapusulate them as a reusable component, too lazy for that rn. 

    const qtyPicker = (
        <div className="flex items-center gap-x-2">
            <IconButton
                className="p-1 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    cart.decreaseQty(data.id);
                }}
                icon={<Minus size="15" />}
            />
            <p className="font-semibold">{qtyInCart}</p>
            <IconButton
                className="p-1 rounded-md"
                disabled={data.quantity === qtyInCart}
                onClick={(e) => {
                    e.stopPropagation();
                    cart.increaseQty(data.id);
                }}
                icon={<Plus size="15" />}
            />
        </div>
    )

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
            <Image
                src={data?.images?.[0]?.url}
                fill
                sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                alt="Product image"
                className="object-cover rounded-lg aspect-square border"
            />
            <div className="opacity-0 group-hover:opacity-100 transition w-full absolute px-6 bottom-5">
                <div className="flex gap-x-6 justify-center">
                    <IconButton 
                        onClick={onPreview} 
                        icon={<Expand size="20" className="text-gray-600" />}
                     />
                    <IconButton 
                         className={`text-gray-600`}
                        onClick={onAddToCart} 
                        icon={<ShoppingCartIcon size="20" />}
                     />
                </div>
            </div>
        </div>
        <div>
            <p className="font-semibold text-lg leading-snug truncate" title={data.name}>
                {data.name}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                {data.category.name}
            </p>
        </div>
        <div className="flex items-center justify-between mt-[-15px]">
            {
                isInCart ? (
                    qtyPicker
                ) : (
                    data.quantity > 0 ? 
                        inventoryLeft : 
                            outOfStock
                )
            }
            <Currency value={data?.price} />
        </div>
    </div>
  )
}

export default ProductCard