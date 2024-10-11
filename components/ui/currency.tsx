'use client'
import { FC, useEffect, useState } from 'react'

interface CurrencyProps {
    value: string | number
}

export const currencyFormatter = new Intl.NumberFormat("en-NG", {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  });

const Currency :FC<CurrencyProps> = ({
    value
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  return (
    <div className='font-semibold text-lg text-green-600'>
        {currencyFormatter.format(Number(value))}
    </div>
  )
}

export default Currency