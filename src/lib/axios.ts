import axios from 'axios'

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
}

const apiRouteHttp = axios.create(config)

export { apiRouteHttp }
