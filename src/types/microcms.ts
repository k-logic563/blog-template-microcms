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
  good_count?: number
  publishedAt: string
}

export type Category = {
  name: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
}

export type Tag = {
  name: string
}

export type Toc = {
  text: string
  name: string
  id: string
}

export type BlogContent = MicroCMSListResponse<Content>
export type CategoryContent = MicroCMSListResponse<Category>
export type TagContent = MicroCMSListResponse<Tag>
