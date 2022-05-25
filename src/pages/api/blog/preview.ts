import { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/utils/httpUtils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.id) {
    return res.status(404).end()
  }

  try {
    const content = await microClient.blogs
      ._id(`${req.query.id}`)
      .$get({ query: { draftKey: `${req.query.draftKey}` } })
    res.setPreviewData({
      id: content.id,
      draftKey: req.query.draftKey,
    })
    res.writeHead(307, { Location: `/blog/${content.id}` })
    res.end('Preview mode enabled')
  } catch {
    return res.status(401).json({ message: 'invalid id' })
  }
}
