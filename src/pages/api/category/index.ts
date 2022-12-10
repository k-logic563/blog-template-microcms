import { NextApiResponse } from 'next'

import { client } from '@/lib/microcms'
import { CategoryContent } from '@/types/type'

export default async (_: unknown, res: NextApiResponse) => {
  const data = await client.get<CategoryContent>({
    endpoint: 'categories',
  })
  return res.status(200).json({ contents: data.contents })
}
