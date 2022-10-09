import { NextApiResponse, NextApiRequest } from 'next'

import { microClient } from '@/lib/axios'

type Response = {
  id: string
}

const sendContactData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await microClient.post<Response>('/contact', req.body)
  return res.status(200).json({ contents: data.id })
}

export default sendContactData
