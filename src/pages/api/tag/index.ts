import type { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/utils/httpUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tags = await microClient.tags.$get()
  return res.status(200).json(tags)
}
