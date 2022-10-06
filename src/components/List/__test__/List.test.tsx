import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { formatDate } from '@/utils'
import { List } from '../List'

test('should render and display correctly', () => {
  const payload = [
    {
      id: faker.datatype.uuid(),
      createdAt: faker.datatype.datetime().toDateString(),
      updatedAt: faker.datatype.datetime().toDateString(),
      publishedAt: faker.datatype.datetime().toDateString(),
      revisedAt: faker.datatype.datetime().toDateString(),
      title: faker.lorem.word(),
      description: faker.lorem.sentence(),
      content: faker.lorem.sentences(),
      eyecatch: {
        url: faker.image.imageUrl(),
        height: faker.datatype.number({ min: 100, max: 500 }),
        width: faker.datatype.number({ min: 100, max: 500 }),
      },
      category: {
        id: faker.datatype.uuid(),
        name: faker.music.genre(),
      },
    },
  ]
  render(<List contents={payload} />)
  screen.getByText(payload[0]['title'])
  screen.getByText(payload[0]['category']['name'])
  screen.getByText(formatDate(payload[0]['publishedAt']))
})
