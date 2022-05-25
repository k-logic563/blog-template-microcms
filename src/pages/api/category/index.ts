import type { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/utils/httpUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cats = await microClient.categories.$get()
  return res.status(200).json(cats)
}
