import { NextApiResponse, NextApiRequest } from 'next'
import crypto from 'crypto'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', process.env.MICROCMS_CACHE_KEY)
      .update(req.body)
      .digest('hex')
    const signature = req.headers['x-microcms-signature']

    if (!signature || Array.isArray(signature)) throw new Error()

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      throw new Error()
    }

    const id = req.body.contents.new.publishValue.id
    await res.unstable_revalidate(`/blog/${id}`)

    return res.status(200).send(null)
  } catch (e) {
    return res.status(500).send('Error revalidating')
  }
}
