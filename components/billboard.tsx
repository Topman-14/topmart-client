import React from 'react'
import { Billboard as BillboardTypes } from '@/types'

interface BillboardProps {
    data: BillboardTypes;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
        <div 
            className='rounded-[1.6rem] relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover border shadow-lg'
            style={{ 
                background: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${data?.imageUrl}) no-repeat center center / cover`,
                backgroundSize: 'cover'
             }}
            >
                <div className="size-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className='font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white text-shadow-lg shadow-[#0000007f]'>
                        {data?.label}
                    </div>
                </div>
        
        </div>
    </div>
  )
}

export default Billboard