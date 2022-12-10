import { NextApiResponse, NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const signature = req.headers['x-revalidate-key']

    if (signature !== process.env.MICROCMS_CACHE_KEY) {
      throw new Error('Invalid token')
    }

    const id = req.body.contents.new.publishValue.id
    await res.unstable_revalidate(`/blog/${id}`)

    return res.status(200).send(null)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).send(e.message)
    }
  }
}
