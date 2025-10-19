import { useMutation } from '@tanstack/react-query'

import { axs } from '@/utils/axios'
import { setSession } from '@/utils/utils'

const prefix = '/auth'

// ------------------------------------------------------------
// Login API
// ------------------------------------------------------------

async function loginAPI(payload) {
  try {
    const data = await axs(`${prefix}/login`, payload)
    return data
  } catch (error) {
    throw error
  }
}

export function useLogin(onSuccess) {
  return useMutation({
    mutationKey: ['auth/login'],
    mutationFn: payload => loginAPI(payload),
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
// Signup API
// ------------------------------------------------------------

async function signupAPI(payload) {
  try {
    const data = await axs(`${prefix}/signup`, payload)
    return data
  } catch (error) {
    throw error
  }
}

export function useSignup(onSuccess) {
  return useMutation({
    mutationKey: ['auth/signup'],
    mutationFn: payload => signupAPI(payload),
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
