import { NextApiResponse } from 'next'

import { microClient } from '@/lib/aspida'

export default async (_: unknown, res: NextApiResponse) => {
  const { contents } = await microClient.blogs.$get()
  return res.status(200).json({ contents })
}
