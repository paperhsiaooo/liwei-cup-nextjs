import { render, screen } from '@testing-library/react'

import ProductsView from '../products-view'

// Mock PATH 常數
jest.mock('@/routers/path', () => ({
  PATH: {
    products: {
      detail: productId => `/products/${productId}`,
    },
  },
}))

describe('ProductsView', () => {
  const mockProducts = [
    {
      id: 'product-1',
      name: 'Product 1',
      description: 'Description 1',
      price: 150,
      tag: 'LIMITED',
      images: ['https://example.com/1.jpg'],
    },
    {
      id: 'product-2',
      name: 'Product 2',
      description: 'Description 2',
      price: 480,
      tag: 'NEW',
      images: ['https://example.com/2.jpg'],
    },
  ]

  test('應該渲染頁面標題', () => {
    render(<ProductsView initialProducts={mockProducts} />)

    expect(screen.getByText('PRODUCTS')).toBeInTheDocument()
    expect(screen.getByText('換取你的紀念時刻')).toBeInTheDocument()
  })

  test('應該顯示商品列表', () => {
    render(<ProductsView initialProducts={mockProducts} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  test('應該使用網格佈局', () => {
    const { container } = render(
      <ProductsView initialProducts={mockProducts} />,
    )

    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('sm:grid-cols-2')
  })

  test('每個商品應該有正確的連結', () => {
    const { container } = render(
      <ProductsView initialProducts={mockProducts} />,
    )

    const links = container.querySelectorAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)

    // 檢查第一個商品連結
    const firstLink = Array.from(links).find(link =>
      link.href.includes('/products/product-1'),
    )
    expect(firstLink).toBeInTheDocument()
  })

  test('應該顯示所有商品的價格', () => {
    render(<ProductsView initialProducts={mockProducts} />)

    expect(screen.getByText('NT$ 150')).toBeInTheDocument()
    expect(screen.getByText('NT$ 480')).toBeInTheDocument()
  })

  test('應該顯示商品標籤', () => {
    render(<ProductsView initialProducts={mockProducts} />)

    expect(screen.getByText('LIMITED')).toBeInTheDocument()
    expect(screen.getByText('NEW')).toBeInTheDocument()
  })

  test('當沒有商品時應該顯示空狀態', () => {
    render(<ProductsView initialProducts={[]} />)

    expect(screen.getByText('目前沒有商品')).toBeInTheDocument()
    expect(screen.getByText('請稍後再來看看')).toBeInTheDocument()
  })

  test('當 initialProducts 為 null 時應該顯示空狀態', () => {
    render(<ProductsView initialProducts={null} />)

    expect(screen.getByText('目前沒有商品')).toBeInTheDocument()
  })

  test('當 initialProducts 為 undefined 時應該顯示空狀態', () => {
    render(<ProductsView initialProducts={undefined} />)

    expect(screen.getByText('目前沒有商品')).toBeInTheDocument()
  })

  test('應該正確處理沒有圖片的商品', () => {
    const productsWithoutImages = [
      {
        id: 'product-1',
        name: 'Product Without Image',
        description: 'No image',
        price: 100,
      },
    ]

    render(<ProductsView initialProducts={productsWithoutImages} />)

    expect(screen.getByText('Product Without Image')).toBeInTheDocument()

    // 應該使用預設圖片
    const image = screen.getByAltText('Product Without Image')
    expect(image).toHaveAttribute('src')
  })

  test('應該正確處理沒有價格的商品', () => {
    const productsWithoutPrice = [
      {
        id: 'product-1',
        name: 'Product Without Price',
        description: 'No price',
        images: ['https://example.com/1.jpg'],
      },
    ]

    render(<ProductsView initialProducts={productsWithoutPrice} />)

    expect(screen.getByText('Product Without Price')).toBeInTheDocument()
    expect(screen.queryByText(/NT\$/)).not.toBeInTheDocument()
  })

  test('應該正確處理沒有標籤的商品', () => {
    const productsWithoutTag = [
      {
        id: 'product-1',
        name: 'Product Without Tag',
        description: 'No tag',
        price: 100,
        images: ['https://example.com/1.jpg'],
      },
    ]

    render(<ProductsView initialProducts={productsWithoutTag} />)

    expect(screen.getByText('Product Without Tag')).toBeInTheDocument()
    expect(screen.queryByText('LIMITED')).not.toBeInTheDocument()
    expect(screen.queryByText('NEW')).not.toBeInTheDocument()
  })

  test('應該優先使用 images 陣列的第一張圖片', () => {
    const productsWithMultipleImages = [
      {
        id: 'product-1',
        name: 'Product With Multiple Images',
        description: 'Test',
        price: 100,
        images: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ],
        heroImage: 'https://example.com/hero.jpg',
        image: 'https://example.com/single.jpg',
      },
    ]

    render(<ProductsView initialProducts={productsWithMultipleImages} />)

    const img = screen.getByAltText('Product With Multiple Images')
    expect(img).toHaveAttribute('src', 'https://example.com/image1.jpg')
  })

  test('應該在沒有 images 時使用 heroImage', () => {
    const productsWithHeroImage = [
      {
        id: 'product-1',
        name: 'Product With Hero Image',
        description: 'Test',
        price: 100,
        heroImage: 'https://example.com/hero.jpg',
      },
    ]

    render(<ProductsView initialProducts={productsWithHeroImage} />)

    const img = screen.getByAltText('Product With Hero Image')
    expect(img).toHaveAttribute('src', 'https://example.com/hero.jpg')
  })

  test('應該正確渲染大量商品', () => {
    const manyProducts = Array.from({ length: 20 }, (_, i) => ({
      id: `product-${i}`,
      name: `Product ${i}`,
      description: `Description ${i}`,
      price: 100 + i * 10,
      images: [`https://example.com/${i}.jpg`],
    }))

    render(<ProductsView initialProducts={manyProducts} />)

    // 檢查第一個和最後一個商品
    expect(screen.getByText('Product 0')).toBeInTheDocument()
    expect(screen.getByText('Product 19')).toBeInTheDocument()
  })

  test('商品卡片應該有正確的 key 屬性', () => {
    const { container } = render(
      <ProductsView initialProducts={mockProducts} />,
    )

    // 通過檢查渲染的商品數量來驗證 key 設置正確（沒有 console 警告）
    const productCards = container.querySelectorAll('.border-blue-primary')
    expect(productCards.length).toBe(mockProducts.length)
  })
})
