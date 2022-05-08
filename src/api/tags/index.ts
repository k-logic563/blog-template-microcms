import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Tag } from '@/api/types'

export type Methods = {
  get: {
    resBody: MicroCMSListResponse<Tag>
  }
}
