import { useMutation } from '@tanstack/react-query'

import { axs } from '@/utils/axios'
import { setSession } from '@/utils/utils'

const prefix = '/user'

async function loginWithInvitationCodeAPI(payload) {
  const data = await axs(`${prefix}/loginWithInvitationCode`, payload)
  return data
}

function useLoginWithInvitationCode(onSuccess) {
  return useMutation({
    mutationKey: ['user/loginWithInvitationCode'],
    mutationFn: payload => loginWithInvitationCodeAPI(payload),
    onSuccess: data => {
      if (data.data.token) {
        setSession(data.data.token)
      }

      onSuccess(data.data)
    },
  })
}

// ------------------------------------------------------------

async function sendFormDataAPI(payload) {
  const data = await axs(`${prefix}/sendFormData`, payload)
  return data
}

function useSendFormData(onSuccess) {
  return useMutation({
    mutationKey: ['user/sendFormData'],
    mutationFn: payload => sendFormDataAPI(payload),
    onSuccess: data => {
      onSuccess(data.data)
    },
  })
}

export {
  loginWithInvitationCodeAPI,
  useLoginWithInvitationCode,
  useSendFormData,
}
