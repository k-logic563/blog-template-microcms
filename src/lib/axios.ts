import axios from 'axios'

const config = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
}

const microConfig = {
  baseURL: `${process.env.MICROCMS_BASE_URL}`,
  headers: {
    'X-MICROCMS-API-KEY': `${process.env.MICROCMS_API_KEY}`,
  },
}

const microClient = axios.create(microConfig)
const client = axios.create(config)

export { client, microClient }
