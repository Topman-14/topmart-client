'use client'

import Image from 'next/image'
import { Tab } from '@headlessui/react'
import { FC } from 'react'
import { Image as ImageType } from '@/types'
import GalleryTab from './gallery-tab'


interface GalleryProps {
    images: ImageType[]
}

const Gallery: FC<GalleryProps> = ({
    images
}) => {
  return (
    <Tab.Group as="div" className={'flex flex-col-reverse'}>
        <div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
            <Tab.List className={"grid grid-cols-4 gap-6"}>
                {images.map(image => (
                    <GalleryTab key={image.id} image={image} />
                ))}
            </Tab.List>
        </div>
        <Tab.Panels className='aspect-square w-full'>
            {images.map(image => (
                <Tab.Panel key={image.id}>
                    <div className='aspect-square relative size-full sm:rounded-lg overflow-hidden'>
                        <Image
                            src={image.url}
                            alt={'product image'}
                            fill
                            className='object-cover object-center rounded-2xl border-2'
                        />
                    </div>
                </Tab.Panel>
            ))} 
        </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery