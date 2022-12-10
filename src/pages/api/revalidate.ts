import { NextApiResponse, NextApiRequest } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const signature = req.headers['x-revalidate-key']

    if (signature !== process.env.MICROCMS_CACHE_KEY) {
      throw new Error()
    }

    const id = req.body.contents.new.publishValue.id
    await res.revalidate(`/blog/${id}`)

    return res.status(200).json({
      revalidated: true,
    })
  } catch (e) {
    return res.redirect('/')
  }
}
