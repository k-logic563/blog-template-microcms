import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Category } from '@/api/types'

export type Methods = {
  get: {
    resBody: MicroCMSListResponse<Category>
  }
}
