import { useMutation } from '@tanstack/react-query'

import { axs } from '@/utils/axios'
import { setSession } from '@/utils/utils'

const prefix = '/user'

async function loginWithInvitationCodeAPI(payload) {
  try {
    const data = await axs(`${prefix}/loginWithInvitationCode`, payload)
    return data
  } catch (error) {}
}

function useLoginWithInvitationCode(onSuccess) {
  return useMutation({
    mutationKey: ['user/loginWithInvitationCode'],
    mutationFn: payload => loginWithInvitationCodeAPI(payload),
    onSuccess: data => {
      if (data) {
        if (data.data.token) {
          setSession(data.data.token)
        }

        onSuccess(data.data)
      } else {
        setSession(null)
      }

      return data
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
