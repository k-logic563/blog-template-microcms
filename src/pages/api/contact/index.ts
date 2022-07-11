import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

const mailApiKey = process.env.SENDMAIL_API_KEY
const templateId = process.env.TEMPLATE_ID

type Payload = sgMail.MailDataRequired

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    sgMail.setApiKey(mailApiKey)

    const data = req.body
    const payload: Payload = {
      personalizations: [
        {
          to: [
            {
              email: data.email,
            },
          ],
          dynamicTemplateData: {
            name: data.name,
            email: data.email,
            content: data.content,
          },
        },
      ],
      from: {
        email: 'k.log.ic563@gmail.com',
      },
      templateId: templateId,
    }

    try {
      await sgMail.send(payload)
      res.statusCode = 200
      res.send({ message: 'done' })
    } catch (error) {
      res.statusCode = 500
      res.send(error)
    }
  } else {
    res.statusCode = 400
    res.send({ error: new Error('invalid parameters') })
  }
}
