import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '@/utils/httpUtils'

const getCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  const cats = await client.categories.$get()
  return res.status(200).json(cats)
}

export default getCategory
