import { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/lib/axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end()
  }

  try {
    const { data } = await microClient.get(`/${req.query.id}`, {
      params: {
        draftKey: `${req.query.draftKey}`,
      },
    })

    res.setPreviewData({
      id: data.content.id,
      draftKey: req.query.draftKey,
    })
    res.writeHead(307, { Location: `/blog/${data.content.id}` })
    res.end('Preview mode enabled')
  } catch {
    return res.status(401).json({ message: 'invalid id' })
  }
}
