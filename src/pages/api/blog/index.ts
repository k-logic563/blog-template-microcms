import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '@/utils/httpUtils'

const getBlog = async (req: NextApiRequest, res: NextApiResponse) => {
  const blogs = await client.blogs.$get()
  return res.status(200).json(blogs)
}

export default getBlog
