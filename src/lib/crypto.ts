import crypto from 'crypto'

export const isCollectSignature = (signature: string, body: any) => {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.MICROCMS_CACHE_KEY)
    .update(body)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}
