import { z } from 'zod'

function formSchema() {
  const defaultValues = {
    inviteCode: '',
  }

  const baseSchema = z.object({
    inviteCode: z.string().min(1, '請輸入邀請碼').max(10, '邀請碼最多10碼'),
  })

  return { defaultValues, baseSchema }
}

export default formSchema
