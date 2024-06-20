import { cn } from '@/lib/utils'
import React, { FC, MouseEventHandler } from 'react'

interface IconButtonProps {
    icon: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    
}

const IconButton: FC<IconButtonProps> = ({
    icon,
    onClick,
    className
}) => {
  return (
    <button 
        onClick={onClick}
        className={cn('rounded-full flex items-center justify-center bg-white border shadow-md p-2 transition hover:scale-110', className)}
    >
        {icon}
    </button>
  )
}

export default IconButton