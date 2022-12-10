import { NextApiResponse, NextApiRequest } from 'next'

import { client } from '@/lib/microcms'

type Response = {
  id: string
}

const sendContactData = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await client.create<Response>({
    endpoint: 'contact',
    content: req.body,
  })
  return res.status(200).json({ contents: data.id })
}

export default sendContactData
