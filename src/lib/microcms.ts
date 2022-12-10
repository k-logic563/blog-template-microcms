import { createClient } from 'microcms-js-sdk'

if (!process.env.MICROCMS_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error('Please set parameter')
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

export { client }
