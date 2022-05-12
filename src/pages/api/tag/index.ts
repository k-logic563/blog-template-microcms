import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '@/utils/httpUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tags = await client.tags.$get()
  return res.status(200).json(tags)
}
