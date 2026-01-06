import { useMutation, useQuery } from '@tanstack/react-query'

import { axs } from '@/utils/axios'

const prefix = '/private/v1/order'

async function createOrderAPI(payload) {
  const data = await axs(`${prefix}`, payload)
  return data
}

async function getOrderDetailAPI(orderNumber) {
  if (!orderNumber) {
    throw new Error('orderNumber is required')
  }

  const data = await axs(
    `${prefix}/${encodeURIComponent(orderNumber)}`,
    null,
    'GET',
  )
  return data
}

async function updateOrderAPI(orderNumber, payload) {
  if (!orderNumber) {
    throw new Error('orderNumber is required')
  }

  const data = await axs(
    `${prefix}/${encodeURIComponent(orderNumber)}`,
    payload,
    'PUT',
  )
  return data
}

function useCreateOrder(onSuccess) {
  return useMutation({
    mutationKey: ['order', 'create'],
    mutationFn: payload => createOrderAPI(payload),
    onSuccess: data => {
      if (typeof onSuccess === 'function' && data?.data) {
        onSuccess(data.data)
      }

      return data
    },
  })
}

function useUpdateOrder(orderNumber, onSuccess) {
  return useMutation({
    mutationKey: ['order', 'update', orderNumber],
    mutationFn: payload => updateOrderAPI(orderNumber, payload),
    onSuccess: data => {
      if (typeof onSuccess === 'function' && data?.data) {
        onSuccess(data.data)
      }

      return data
    },
  })
}

function useOrderDetail(orderNumber, options = {}) {
  return useQuery({
    queryKey: ['order', 'detail', orderNumber],
    queryFn: () => getOrderDetailAPI(orderNumber),
    enabled: Boolean(orderNumber),
    ...options,
  })
}

export {
  createOrderAPI,
  getOrderDetailAPI,
  updateOrderAPI,
  useCreateOrder,
  useOrderDetail,
  useUpdateOrder,
}
