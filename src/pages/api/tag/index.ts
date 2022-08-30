import { NextApiResponse } from 'next'

import { microClient } from '@/lib/axios'
import { TagContent } from '@/types/type'

export default async (_: unknown, res: NextApiResponse) => {
  const { data } = await microClient.get<TagContent>('/tags', {
    params: {
      limit: 20,
    },
  })

  return res.status(200).json({ contents: data.contents })
}
