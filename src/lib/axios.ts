import axios from 'axios'

const config = {
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
}

const client = axios.create(config)

export { client }
