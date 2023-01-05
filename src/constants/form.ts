import * as z from 'zod'

export const schema = z.object({
  name: z.string().refine((val) => val.trim(), {
    message: '必須項目です',
  }),
  email: z.string().email('メールアドレス形式が違います'),
  message: z.string().refine((val) => val.trim(), {
    message: '必須項目です',
  }),
})
