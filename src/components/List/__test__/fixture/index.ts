import type { BlogContent } from '@/types/microcms'

type Contents = BlogContent['contents']

export const contents: Contents = [
  {
    id: '1',
    title: 'title1',
    description: 'description1',
    content: 'content1',
    eyecatch: {
      url: 'url1',
      height: 1,
      width: 1,
    },
    category: {
      id: '1',
      name: 'name1',
    },
    good_count: 1,
    publishedAt: '2021-01-01T00:00:00.000Z',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'title2',
    description: 'description2',
    content: 'content2',
    eyecatch: {
      url: 'url2',
      height: 2,
      width: 2,
    },
    category: {
      id: '2',
      name: 'name2',
    },
    good_count: 2,
    publishedAt: '2022-02-02T00:00:00.000Z',
    createdAt: '2022-02-02T00:00:00.000Z',
    updatedAt: '2022-02-02T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'title3',
    description: 'description3',
    content: 'content3',
    eyecatch: {
      url: 'url3',
      height: 3,
      width: 3,
    },
    category: {
      id: '3',
      name: 'name3',
    },
    good_count: 3,
    publishedAt: '2303-03-03T00:00:00.000Z',
    createdAt: '2303-03-03T00:00:00.000Z',
    updatedAt: '2303-03-03T00:00:00.000Z',
  },
]
