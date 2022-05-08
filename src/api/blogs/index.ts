import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'
import { Content } from '@/api/types'

export type Methods = {
  get: {
    query?: MicroCMSQueries
    resBody: MicroCMSListResponse<Content>
  }
}
