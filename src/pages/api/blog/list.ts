import { NextApiResponse, NextApiRequest } from 'next'

import { client } from '@/lib/microcms'
import { BlogContent } from '@/types/microcms'
import { encodeUrl } from '@/utils/converter'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query

  const data = await client.get<BlogContent>({
    endpoint: `blogs?${encodeUrl(query)}`,
  })
  return res.status(200).json({ contents: data.contents })
}
