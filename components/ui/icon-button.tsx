import { cn } from '@/lib/utils'
import React, { FC, MouseEventHandler } from 'react'

interface IconButtonProps {
    icon: React.ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    disabled?: boolean
}

const IconButton: FC<IconButtonProps> = ({
    icon,
    onClick,
    className,
    disabled
}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={cn('rounded-full flex items-center justify-center bg-white border shadow-md p-2 transition hover:scale-110', 
          disabled &&'opacity-35 cursor-not-allowed hover:scale-100',
          className)}
    >
        {icon}
    </button>
  )
}

export default IconButton