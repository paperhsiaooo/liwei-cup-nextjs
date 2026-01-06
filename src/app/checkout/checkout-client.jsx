'use client'

import { useSearchParams } from 'next/navigation'

import { CheckoutView } from '@/sections/checkout/views'

function CheckoutClient() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber') || ''

  return <CheckoutView orderNumber={orderNumber} />
}

export default CheckoutClient
