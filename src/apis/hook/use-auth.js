import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { axs } from '@/utils/axios'

const AUTH_PUBLIC_PREFIX = '/public/v1/auth'

const authLoginResponseSchema = z.null()

const authRegisterResponseSchema = z.object({
  email: z.string().email(),
  invitation_code: z.string().nullable().optional(),
  status: z.string(),
  is_resend: z.boolean(),
})

// ------------------------------------------------------------
// Login API
// ------------------------------------------------------------

async function loginAPI(payload) {
  try {
    const data = await axs(`${AUTH_PUBLIC_PREFIX}/login`, payload)
    if (data?.data !== undefined) {
      const parsed = authLoginResponseSchema.safeParse(data.data)
      if (!parsed.success) {
        throw parsed.error
      }
    }
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
      if (!data) {
        return data
      }

      const payload = data.data === null ? {} : data.data
      onSuccess?.(payload)
      return data
    },
  })
}

// ------------------------------------------------------------
// Signup API
// ------------------------------------------------------------

async function signupAPI(payload) {
  try {
    const data = await axs(`${AUTH_PUBLIC_PREFIX}/register`, payload)
    if (data?.data) {
      const parsed = authRegisterResponseSchema.safeParse(data.data)
      if (!parsed.success) {
        throw parsed.error
      }
    }
    return data
  } catch (error) {
    throw error
  }
}

export function useSignup(onSuccess) {
  return useMutation({
    mutationKey: ['auth/register'],
    mutationFn: payload => signupAPI(payload),
    onSuccess: data => {
      if (!data) {
        return data
      }

      onSuccess?.(data.data)
      return data
    },
  })
}
