import aspida from '@aspida/axios'
import axios from 'axios'

import api from '@/api/$api'

const config = {
  baseURL: process.env.NEXT_PUBLIC_MICROCMS_BASE_URL,
  headers: {
    'X-MICROCMS-API-KEY': `${process.env.NEXT_PUBLIC_MICROCMS_API_KEY}`,
  },
}

export const microClient = api(aspida(axios, config))
