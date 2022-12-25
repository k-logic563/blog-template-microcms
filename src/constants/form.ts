import * as z from 'zod'

export const schema = z.object({
  name: z.string().min(1, '必須項目です'),
  email: z.string().email('メールアドレス形式が違います'),
  message: z.string().min(1, '必須項目です'),
})
