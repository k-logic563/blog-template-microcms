import { NextApiResponse } from 'next'

import { microClient } from '@/lib/axios'

export default async (_: unknown, res: NextApiResponse) => {
  const { data } = await microClient.get('/tags', {
    params: {
      limit: 20,
    },
  })
  return res.status(200).json({ contents: data.contents })
}
