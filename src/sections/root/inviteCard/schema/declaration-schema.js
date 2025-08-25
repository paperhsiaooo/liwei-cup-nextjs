import { z } from 'zod'

function declarationSchema() {
  const defaultValues = {
    declaration1: '',
    declaration2: '',
    declaration3: '',
  }

  const baseSchema = z.object({
    declaration1: z.string().min(1, '請選擇參戰宣言'),
    declaration2: z.string().min(1, '請選擇參戰宣言'),
    declaration3: z.string().min(1, '請選擇參戰宣言'),
  })

  return { defaultValues, baseSchema }
}

export default declarationSchema
