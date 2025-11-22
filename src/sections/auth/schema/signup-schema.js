import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().min(1, '請輸入 Email').email('請輸入有效的 Email'),

    password: z
      .string()
      .min(8, '密碼至少需要 8 個字元')
      .regex(/[A-Z]/, '密碼需包含至少一個大寫字母')
      .regex(/[a-z]/, '密碼需包含至少一個小寫字母')
      .regex(/[0-9]/, '密碼需包含至少一個數字'),

    confirmPassword: z.string().min(1, '請確認密碼'),

    invitationCode: z.string().optional(), // 選填
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  })

export const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  invitationCode: '',
}
