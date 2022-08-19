import { NextApiResponse } from 'next'

import { microClient } from '@/lib/axios'
import { CategoryContent } from '@/types/type'

export default async (_: unknown, res: NextApiResponse) => {
  const { data } = await microClient.get<CategoryContent>('/categories')
  return res.status(200).json({ contents: data.contents })
}
