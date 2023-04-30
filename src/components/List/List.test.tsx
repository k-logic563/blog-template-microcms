import { render, screen, within } from '@testing-library/react'

import { contents } from './__test__/fixture'
import { List } from './List'

test('コンテンツ数の数だけ一覧表示させる', () => {
  render(<List contents={contents} />)
  const list = screen.getByRole('list')
  expect(list).toBeInTheDocument()

  expect(within(list).getAllByRole('listitem').length).toBe(contents.length)
})

test('コンテンツがない場合は「記事がありません」と表示する', () => {
  render(<List contents={[]} />)
  const list = screen.queryByRole('list')
  expect(list).not.toBeInTheDocument()
  expect(list).toBeNull()
  expect(screen.getByText('記事がありません')).toBeInTheDocument()
})
