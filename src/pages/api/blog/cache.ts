import { NextApiResponse, NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (
      req.headers['x-microcms-signature'] !== process.env.MICROCMS_CACHE_KEY
    ) {
      return res.status(401).send('invalid token')
    }

    const id = req.body.contents.news.publishValue.id
    await res.unstable_revalidate(`blogs/${id}`)

    return res.status(200).send(null)
  } catch (e) {
    return res.status(500).send('Error revalidating')
  }
}
