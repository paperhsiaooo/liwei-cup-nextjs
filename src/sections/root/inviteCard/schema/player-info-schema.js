import { z } from 'zod'

function playerInfoSchema() {
  const defaultValues = {
    nickName: '',
    isParticipating: 1,
    shirtSize: '',
  }

  const baseSchema = z.object({
    nickName: z.string().min(1, '請輸入暱稱').max(10, '暱稱最多 10 字'),
    isParticipating: z
      .number()
      .min(0, '請選擇是否參加')
      .max(1, '請選擇是否參加'),
    shirtSize: z.enum(['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'], {
      message: '請選擇衣服尺寸',
    }),
  })

  return { defaultValues, baseSchema }
}

export default playerInfoSchema
