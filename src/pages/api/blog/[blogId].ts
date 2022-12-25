import { NextApiResponse, NextApiRequest } from 'next'

import { client } from '@/lib/microcms'
import { BlogContent } from '@/types/microcms'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const blogId = req.query.blogId
  const payload = req.body

  const data = await client.update<BlogContent>({
    endpoint: `blogs/${blogId}`,
    content: payload,
  })
  return res.status(200).json(data)
}
