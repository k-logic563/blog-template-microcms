import { NextApiResponse, NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.headers['x-revalidate-key'] !== process.env.MICROCMS_CACHE_KEY) {
      return res.status(401).send('Invalid token')
    }

    const id = req.body.contents.new.publishValue.id
    await res.unstable_revalidate(`/blog/${id}`)

    return res.status(200).send(null)
  } catch (e) {
    return res.status(500).send('Error revalidating')
  }
}
