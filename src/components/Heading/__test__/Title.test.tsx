import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { Title } from '../Title'

test('should render and display correctly', () => {
  const title = faker.word.adjective()
  const subtitle = faker.word.adjective()

  render(<Title title={title} subTitle={subtitle} />)
  screen.getByText(title)
  screen.getByText(subtitle)
})
