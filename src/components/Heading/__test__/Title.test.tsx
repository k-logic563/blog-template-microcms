import { faker } from '@faker-js/faker'
import { render, screen } from '@testing-library/react'

import { Title } from '../Title'

test('タイトル表示', () => {
  const title = faker.word.adjective()
  const subtitle = faker.word.adjective()

  render(<Title title={title} subTitle={subtitle} />)
  screen.getByText(title)
  screen.getByText(subtitle)
})
