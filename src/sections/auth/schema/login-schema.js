import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, '請輸入 Email').email('請輸入有效的 Email'),

  password: z.string().min(8, '密碼至少需要 8 個字元'),
})

export const defaultValues = {
  email: '',
  password: '',
}
