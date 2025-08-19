import { z } from 'zod'

function playerInfoSchema() {
  const defaultValues = {
    nickName: '',
    isParticipating: 1,
    address: '',
    shirtSize: '',
  }

  const baseSchema = z
    .object({
      nickName: z.string().min(1, '請輸入暱稱').max(10, '暱稱最多 10 字'),
      isParticipating: z
        .number()
        .min(0, '請選擇是否參加')
        .max(1, '請選擇是否參加'),
      address: z.string().optional(),
      shirtSize: z.enum(['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'], {
        message: '請選擇衣服尺寸',
      }),
    })
    .refine(
      data => {
        // 當 isParticipating 為 0 時，address 為必填
        if (data.isParticipating === 0) {
          return data.address && data.address.trim().length > 0
        }
        return true
      },
      {
        message: '請輸入收件地址',
        path: ['address'],
      },
    )

  return { defaultValues, baseSchema }
}

export default playerInfoSchema
