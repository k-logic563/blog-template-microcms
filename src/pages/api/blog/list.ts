import { NextApiResponse, NextApiRequest } from 'next'

import { microClient } from '@/lib/axios'
import { encodeUrl } from '@/utils/converter'
import { BlogContent } from '@/types/type'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query

  const { data } = await microClient.get<BlogContent>(
    `blogs?${encodeUrl(query)}`
  )
  return res.status(200).json({ contents: data.contents })
}
