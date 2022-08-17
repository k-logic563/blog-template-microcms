import { render, screen } from '@testing-library/react'

import { Pagination } from '../Pagination'

describe('should render and display correctly', () => {
  it('rendering to page1', async () => {
    render(<Pagination totalCount={4} path="blog" pageId={1} />)
    const page1 = screen.getByText('1')
    expect(page1.classList.contains('is-active')).toBe(true)
  })

  it('rendering to page2', async () => {
    render(<Pagination totalCount={8} path="blog" pageId={2} />)
    const page2 = screen.getByText('2')
    expect(page2.classList.contains('is-active')).toBe(true)
  })
})
