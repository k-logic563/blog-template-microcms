import { render, screen } from '@testing-library/react'

import { List } from '../List'

test('should render and display correctly', () => {
  const mockData = [
    {
      id: '42o5yuhdagk',
      createdAt: '2022-06-01T12:18:55.030Z',
      updatedAt: '2022-06-04T00:05:16.863Z',
      publishedAt: '2022-06-01T12:32:05.978Z',
      revisedAt: '2022-06-04T00:05:16.863Z',
      title: 'テストタイトル',
      description: 'テストディスクリプション',
      content: 'テストコンテンツ',
      eyecatch: {
        url: 'https://localhost/dammy.jpg',
        height: 675,
        width: 1200,
      },
      category: {
        id: '7xkvgc6r8-rp',
        createdAt: '2022-05-10T22:25:21.713Z',
        updatedAt: '2022-05-10T22:25:21.713Z',
        publishedAt: '2022-05-10T22:25:21.713Z',
        revisedAt: '2022-05-10T22:25:21.713Z',
        name: 'フロントエンド',
      },
    },
  ]
  render(<List contents={mockData} />)
  screen.getByText('テストタイトル')
  screen.getByText('フロントエンド')
  screen.getByText('2022.06.01')
})
