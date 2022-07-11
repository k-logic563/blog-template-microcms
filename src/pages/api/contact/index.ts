import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

const mailApiKey = process.env.SENDMAIL_API_KEY
const templateId = process.env.TEMPLATE_ID
const fromEmail = process.env.FROM_EMAIL

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
        email: fromEmail,
      },
      templateId: templateId,
    }

    try {
      await sgMail.send(payload)
      return res.status(200).json(payload)
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  return res.status(400).json({ error: 'invalid parameters' })
}
