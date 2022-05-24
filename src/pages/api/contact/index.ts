import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

const mailApiKey = process.env.NEXT_PUBLIC_SENDMAIL_API_KEY
const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID

type Payload = sgMail.MailDataRequired

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    sgMail.setApiKey(mailApiKey)

    const data = req.body
    const payload: Payload = {
      to: {
        email: data.email,
      },
      bcc: {
        email: 'k.log.ic563@gmail.com',
      },
      from: {
        email: 'k.log.ic563@gmail.com',
        name: 'iwtttter-blog',
      },
      dynamicTemplateData: {
        name: data.name,
        email: data.email,
        contents: data.contents,
      },
      templateId: templateId,
    }

    sgMail
      .send(payload)
      .then(() => {
        res.statusCode = 200
        res.send({ message: 'done' })
      })
      .catch((error) => {
        res.statusCode = 500
        res.send(error)
      })
  } else {
    res.statusCode = 400
    res.send({ error: new Error('invalid parameters') })
  }
}
