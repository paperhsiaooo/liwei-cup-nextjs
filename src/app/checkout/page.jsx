import CheckoutClient from './checkout-client'

export const metadata = {
  title: '結帳',
  description: '填寫收件資訊以完成訂單。',
}

function CheckoutPage() {
  return <CheckoutClient />
}

export default CheckoutPage
