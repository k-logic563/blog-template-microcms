import { MicroCMSListResponse } from 'microcms-js-sdk'

export type Content = {
  id: string
  title: string
  description: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  category: {
    id: string
    name: string
  }
  tag: {
    id: string
    name: string
  }
}

export type Category = {
  name: string
}

export type Tag = {
  name: string
}

export type BlogContent = MicroCMSListResponse<Content>
export type CategoryContent = MicroCMSListResponse<Category>
export type TagContent = MicroCMSListResponse<Tag>
