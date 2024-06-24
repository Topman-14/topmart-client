'use client'
import Button from "@/components/ui/custom-button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { FC, useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters:FC<MobileFiltersProps> = ({
    sizes,
    colors
}) => {
    const [open, setOpen] = useState(false)

    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)

  return (
    <>
        <Button onClick={onOpen} className="flex iems-center gap-x-2 lg:hidden">
            Filters
            <Plus size={20} />
        </Button>

        <Dialog 
            open={open}
            as="div" 
            onClose={onClose} 
            className="relative z-40 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25 transition-all" />
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className={"relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl animate-in fade-in slide-in-from-right"}>
                        <div className="flex items-center justify-end px-4">
                            <IconButton icon={<X size={15} />} onClick={onClose} />
                        </div>
                        <div className="p-4">
                        <Filter
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}
                            onClickClose={onClose}
                            />
                        <Filter
                            valueKey="colorId"
                            name="Colors"
                            data={colors}
                            onClickClose={onClose}
                         />
                        </div>
                    </Dialog.Panel>
                </div>
        </Dialog>
    </>
  )
}

export default MobileFilters