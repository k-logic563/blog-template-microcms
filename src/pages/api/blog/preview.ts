import { NextApiRequest, NextApiResponse } from 'next'

import { client } from '@/lib/microcms'
import { Content } from '@/types/type'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end()
  }

  try {
    const data = await client.get<Content>({
      endpoint: `blogs/${req.query.id}`,
      queries: {
        draftKey: `${req.query.draftKey}`,
      },
    })

    res.setPreviewData({
      id: data.id,
      draftKey: req.query.draftKey,
    })
    res.writeHead(307, { Location: `/blog/${data.id}` })
    res.end('Preview mode enabled')
  } catch {
    return res.status(401).json({ message: 'invalid id' })
  }
}
