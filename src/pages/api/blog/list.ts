import { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/lib/aspida'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { contents } = await microClient.blogs.$get()
  return res.status(200).json({ contents })
}
