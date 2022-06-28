import { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/lib/aspida'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { contents } = await microClient.tags.$get({
    query: {
      limit: 20,
    },
  })
  return res.status(200).json({ contents })
}
