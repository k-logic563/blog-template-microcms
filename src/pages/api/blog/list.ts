import { NextApiResponse } from 'next'

import { microClient } from '@/lib/axios'
import { BlogContent } from '@/types/type'

export default async (_: unknown, res: NextApiResponse) => {
  const { data } = await microClient.get<BlogContent>('blogs')
  return res.status(200).json({ contents: data.contents })
}
