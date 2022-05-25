import type { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/utils/httpUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const blogs = await microClient.blogs.$get()
  return res.status(200).json(blogs)
}
