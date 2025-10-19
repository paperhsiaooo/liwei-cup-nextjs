export const paths = {
  root: '/',
}

export const PATH = {
  root: '/',

  // 商品相關
  products: {
    list: '/products',
    detail: productId => `/products/${productId}`,
  },

  // 認證相關
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout', // 未來功能
  },

  // 設定頁面
  settings: {
    profile: '/settings/profile',
  },

  // 購物流程
  cart: '/cart',
  checkout: {
    root: '/checkout',
    pay: '/checkout/pay',
  },
  confirm: '/confirm',

  // 完成頁面
  shop: {
    complete: '/shop/complete',
  },
}
