import CartPageClient from './cart-page-client'

export const metadata = {
  title: '購物車',
  description: '檢視您的購物車內容並準備結帳。',
}

function CartPage() {
  return <CartPageClient />
}

export default CartPage
