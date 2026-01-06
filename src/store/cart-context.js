import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const createCartKey = ({ productId, color, size }) =>
  [productId ?? '', color ?? '', size ?? ''].join('::')

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: item => {
        if (!item?.productId) {
          return
        }

        const key = createCartKey(item)
        const quantity = Number(item?.quantity) > 0 ? Number(item.quantity) : 1
        const price =
          typeof item?.price === 'number'
            ? item.price
            : Number(String(item?.price ?? '').replace(/[^\d.]/g, '')) || 0

        set(state => {
          const existingIndex = state.items.findIndex(
            cartItem => cartItem.id === key,
          )

          if (existingIndex === -1) {
            return {
              items: [
                ...state.items,
                {
                  id: key,
                  productId: item.productId,
                  variantId:
                    item.variantId ??
                    item.skuId ??
                    item.variant ??
                    item.sku ??
                    '',
                  name: item.name || '未命名商品',
                  price,
                  image: item.image || '',
                  color: item.color || '',
                  size: item.size || '',
                  quantity,
                },
              ],
            }
          }

          const nextItems = [...state.items]
          const current = nextItems[existingIndex]

          nextItems[existingIndex] = {
            ...current,
            quantity: current.quantity + quantity,
          }

          return { items: nextItems }
        })
      },
      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),
      clear: () => set({ items: [] }),
      updateQuantity: (id, nextQuantity) =>
        set(state => {
          const quantity = Number(nextQuantity)
          if (Number.isNaN(quantity)) {
            return state
          }

          if (quantity <= 0) {
            return {
              items: state.items.filter(item => item.id !== id),
            }
          }

          const nextItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item,
          )

          return { items: nextItems }
        }),
      incrementItem: id =>
        set(state => {
          const nextItems = state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )
          return { items: nextItems }
        }),
      decrementItem: id =>
        set(state => {
          const nextItems = state.items
            .map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter(item => item.quantity > 0)

          return { items: nextItems }
        }),
      getCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'liwei-cart',
      storage: createJSONStorage(() =>
        typeof window === 'undefined'
          ? {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined,
            }
          : window.localStorage,
      ),
      partialize: state => ({ items: state.items }),
    },
  ),
)

export default useCartStore
