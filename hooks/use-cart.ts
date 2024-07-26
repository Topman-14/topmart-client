import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { Product } from "@/types";

interface CartProduct extends Product {
    quantity: number;
    stock: number;
}

interface CartStore {
    items: CartProduct[];
    addItem: (data: Product, quantity?: number) => void;
    removeItem: (id: string) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
    setQty: (id: string, newQty:number) => void;
    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product, quantity = 1) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                toast.error("Item already in cart");
            } else {
                const stock = data.quantity;
                set({
                    items: [
                        ...get().items,
                         { 
                            ...data, 
                            stock,
                            quantity, 
                        }],
                });
                toast.success("Item added to cart");
            }
        },
        removeItem: (id: string) => {
            set({
                items: get().items.filter((item) => item.id !== id),
            });
            toast.success("Item removed from cart");
        },
        increaseQty: (id: string) => {
            const currentItems = get().items;
            const item = currentItems.find((item) => item.id === id);
            if (item) {
                set({
                    items: currentItems.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                });
                toast.success(`Cart updated`);
            }
        },
        decreaseQty: (id: string) => {
            const currentItems = get().items;
            const item = currentItems.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                set({
                    items: currentItems.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                    ),
                });
                toast.success("Cart updated");
            } else if (item) {
                get().removeItem(id);
            }
        },
        setQty: (id: string, newQty: number) => {
            const currentItems = get().items;
            const item = currentItems.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                set({
                    items: currentItems.map((item) =>
                        item.id === id ? { ...item, quantity: newQty} : item
                    ),
                });
            } else if (item) {
                get().removeItem(id);
            }
        },
        removeAll: () => {
            set({ items: [] });
        },
    }),
    {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
    })
);

export default useCart;