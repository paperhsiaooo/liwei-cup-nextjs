import { useMutation } from '@tanstack/react-query'

import { axs } from '@/utils/axios'

const prefix = '/private/v1/order'

async function createOrderAPI(payload) {
  const data = await axs(`${prefix}`, payload)
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

export { createOrderAPI, useCreateOrder }
