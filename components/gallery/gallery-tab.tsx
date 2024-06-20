import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { Image as ImageType } from '@/types'

interface GalleryTabProps {
    image: ImageType
}

const GalleryTab: FC<GalleryTabProps> = ({
    image
}) => {
  return (
    <Tab className={'flex items-center justify-center relative bg-white rounded-md aspect-square cursor-pointer'}>
        {({ selected }) => (
            <div>
                <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
                    <Image
                        src={image.url}
                        alt={'product image'}
                        fill
                        className='object-cover object-center'
                    />
                </span>
                <span 
                    className={cn("absolute inset-0 rounded-md rind-2 ring-offset-2", selected ? "ring-black" : "ring-transparent")}
                />
            </div>
        )}
    </Tab>
  )
}

export default GalleryTab