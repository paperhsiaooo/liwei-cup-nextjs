import { z } from 'zod'

export const checkoutSchema = z.object({
  // 訂購人資訊 (Custom Info)
  fullName: z
    .string()
    .min(1, '請輸入全名')
    .min(2, '姓名至少需要 2 個字元')
    .max(50, '姓名最多 50 個字元'),

  email: z.string().min(1, '請輸入信箱').email('請輸入有效的 Email 格式'),

  phone: z
    .string()
    .min(1, '請輸入聯絡電話')
    .regex(/^09\d{8}$/, '請輸入有效的手機號碼格式（09xxxxxxxx）'),

  gender: z.string().optional(),

  // 收件人資訊 (Delivery Detail)
  sameAsCustomer: z.boolean().default(false),

  deliveryName: z
    .string()
    .min(1, '請輸入收件人姓名')
    .min(2, '姓名至少需要 2 個字元')
    .max(50, '姓名最多 50 個字元'),

  recipientPhone: z
    .string()
    .min(1, '請輸入收件人電話')
    .regex(/^09\d{8}$/, '請輸入有效的手機號碼格式（09xxxxxxxx）'),

  // 門市資訊 (必須已選 7-11 門市)
  storeId: z.string().min(1, '請選擇 7-11 門市'),
  storeName: z.string().min(1, '請選擇 7-11 門市'),
  storeAddress: z.string().min(1, '請選擇 7-11 門市'),
  storeTel: z.string().optional().default(''),

  // 配送備註
  deliveryNote: z
    .string()
    .max(200, '備註最多 200 個字元')
    .optional()
    .default(''),

  // 條款同意
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: '請同意服務條款與隱私權政策',
  }),
})

export const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  sameAsCustomer: false,
  deliveryName: '',
  recipientPhone: '',
  storeId: '',
  storeName: '',
  storeAddress: '',
  storeTel: '',
  deliveryNote: '',
  agreeToTerms: false,
}

// 性別選項
export const GENDER_OPTIONS = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
  { value: 'prefer-not-to-say', label: '不願透露' },
]
