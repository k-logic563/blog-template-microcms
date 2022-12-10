import { NextApiResponse, NextApiRequest } from 'next'

import { isCollectSignature } from '@/lib/crypto'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const xSignature = req.headers['x-microcms-signature']
    if (!xSignature || Array.isArray(xSignature)) throw new Error()

    if (!isCollectSignature(xSignature, req.body)) {
      return res.status(401).send('Invalid token')
    }

    const id = req.body.contents.new.publishValue.id
    await res.unstable_revalidate(`/blog/${id}`)

    return res.status(200).send(null)
  } catch (e) {
    return res.status(500).send('Error revalidating')
  }
}
