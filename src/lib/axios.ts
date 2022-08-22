import axios from 'axios'

const microConfig = {
  baseURL: `${process.env.MICROCMS_BASE_URL}`,
  headers: {
    'X-MICROCMS-API-KEY': `${process.env.MICROCMS_API_KEY}`,
  },
}

const microClient = axios.create(microConfig)

export { microClient }
