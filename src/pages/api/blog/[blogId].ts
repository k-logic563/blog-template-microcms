import { NextApiResponse, NextApiRequest } from 'next'

import { microClient } from '@/lib/axios'
import { BlogContent } from '@/types/type'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const blogId = req.query.blogId
  const payload = req.body

  const { data } = await microClient.patch<BlogContent>(
    `blogs/${blogId}`,
    payload
  )
  return res.status(200).json(data)
}
