import * as z from 'zod'

export const schema = z.object({
  name: z.string().min(1, { message: '※必須項目です' }),
  email: z
    .string()
    .min(1, { message: '※必須項目です' })
    .email({ message: '※不正なメールアドレスです' }),
  contents: z.string().min(1, { message: '※必須項目です' }),
})
