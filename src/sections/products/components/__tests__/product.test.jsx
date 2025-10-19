import { render, screen } from '@testing-library/react'

import Product from '../product'

describe('Product Component', () => {
  describe('Product.Container', () => {
    test('應該渲染子元素', () => {
      render(
        <Product.Container>
          <div data-testid="child-content">Test Content</div>
        </Product.Container>,
      )

      expect(screen.getByTestId('child-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    test('當提供 href 時應該渲染為 Link', () => {
      const { container } = render(
        <Product.Container href="/products/test-id">
          <div>Content</div>
        </Product.Container>,
      )

      const link = container.querySelector('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/products/test-id')
    })

    test('當沒有提供 href 時應該渲染為 div', () => {
      const { container } = render(
        <Product.Container>
          <div>Content</div>
        </Product.Container>,
      )

      const link = container.querySelector('a')
      const div = container.querySelector('div')

      expect(link).toBeNull()
      expect(div).toBeInTheDocument()
    })

    test('應該套用正確的樣式類別', () => {
      const { container } = render(
        <Product.Container href="/test">
          <div>Content</div>
        </Product.Container>,
      )

      const link = container.querySelector('a')
      expect(link).toHaveClass('border-8')
      expect(link).toHaveClass('border-blue-primary')
      expect(link).toHaveClass('group')
    })

    test('應該支援自訂 className', () => {
      const { container } = render(
        <Product.Container className="custom-class">
          <div>Content</div>
        </Product.Container>,
      )

      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('custom-class')
    })

    test('應該支援 onClick 事件', () => {
      const handleClick = jest.fn()
      render(
        <Product.Container onClick={handleClick}>
          <div>Content</div>
        </Product.Container>,
      )

      const wrapper = screen.getByText('Content').parentElement
      wrapper.click()

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Product.Content', () => {
    const mockProduct = {
      name: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      price: 150,
      tag: 'LIMITED',
    }

    test('應該顯示商品名稱', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    test('應該顯示商品描述', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    test('應該顯示格式化的價格', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('NT$ 150')).toBeInTheDocument()
    })

    test('應該顯示商品圖片', () => {
      render(<Product.Content {...mockProduct} />)
      const image = screen.getByAltText('Test Product')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
    })

    test('應該顯示標籤', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('LIMITED')).toBeInTheDocument()
    })

    test('當沒有價格時不應該顯示價格', () => {
      // eslint-disable-next-line no-unused-vars
      const { price, ...productWithoutPrice } = mockProduct
      render(<Product.Content {...productWithoutPrice} />)
      expect(screen.queryByText(/NT\$/)).not.toBeInTheDocument()
    })

    test('當價格為 0 時不應該顯示價格', () => {
      render(<Product.Content {...mockProduct} price={0} />)
      expect(screen.queryByText(/NT\$/)).not.toBeInTheDocument()
    })

    test('當沒有標籤時不應該顯示標籤', () => {
      // eslint-disable-next-line no-unused-vars
      const { tag, ...productWithoutTag } = mockProduct
      render(<Product.Content {...productWithoutTag} />)
      expect(screen.queryByText('LIMITED')).not.toBeInTheDocument()
    })

    test('當沒有描述時不應該顯示描述', () => {
      // eslint-disable-next-line no-unused-vars
      const { description, ...productWithoutDescription } = mockProduct
      render(<Product.Content {...productWithoutDescription} />)
      expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
    })

    test('應該正確處理不同的價格值', () => {
      const { rerender } = render(
        <Product.Content {...mockProduct} price={100} />,
      )
      expect(screen.getByText('NT$ 100')).toBeInTheDocument()

      rerender(<Product.Content {...mockProduct} price={1280} />)
      expect(screen.getByText('NT$ 1,280')).toBeInTheDocument()
    })

    test('應該正確處理不同的標籤', () => {
      const tags = ['LIMITED', 'NEW', 'HOT', 'BEST SELLER']

      tags.forEach(tag => {
        const { container } = render(
          <Product.Content {...mockProduct} tag={tag} />,
        )
        expect(screen.getByText(tag)).toBeInTheDocument()
        container.remove()
      })
    })
  })

  describe('Product Compound Component', () => {
    test('應該支援組合使用', () => {
      const mockProduct = {
        name: 'Volleyball Socks',
        description: 'Premium volleyball socks',
        image: 'https://example.com/socks.jpg',
        price: 150,
        tag: 'LIMITED',
      }

      render(
        <Product.Container href="/products/socks">
          <Product.Content {...mockProduct} />
        </Product.Container>,
      )

      // 驗證所有元素都正確渲染
      expect(screen.getByText('Volleyball Socks')).toBeInTheDocument()
      expect(screen.getByText('Premium volleyball socks')).toBeInTheDocument()
      expect(screen.getByText('NT$ 150')).toBeInTheDocument()
      expect(screen.getByText('LIMITED')).toBeInTheDocument()

      // 驗證連結正確
      const link = screen.getByText('Volleyball Socks').closest('a')
      expect(link).toHaveAttribute('href', '/products/socks')
    })
  })
})
