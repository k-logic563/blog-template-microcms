import { MicroCMSObjectContent, MicroCMSQueries } from 'microcms-js-sdk'
import { Content } from '@/api/types'

export type Methods = {
  get: {
    query?: Pick<MicroCMSQueries, 'draftKey' | 'fields' | 'depth'>
    resBody: Content & MicroCMSObjectContent
  }
}
