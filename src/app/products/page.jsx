import ProductsClient from './products-client'

export const metadata = {
  title: '商品兌換',
  description:
    '2025 力維盃錦標賽商品兌換專區，使用活動點數兌換精美排球周邊商品與紀念品。',
  keywords: ['力維盃商品', '排球周邊', '商品兌換', '力維盃紀念品', '排球商品'],
  openGraph: {
    title: '商品兌換 | 2025 力維盃錦標賽',
    description:
      '2025 力維盃錦標賽商品兌換專區，使用活動點數兌換精美排球周邊商品與紀念品。',
    url: 'https://liwei-cup.com/products',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/products',
  },
}

function ProductsPage() {
  return <ProductsClient />
}

export default ProductsPage
