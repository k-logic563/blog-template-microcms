import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { formatDate } from '@/utils'
import { Item } from '../Item'

test('リストアイテム表示', () => {
  const payload = {
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
  }

  render(<Item item={payload} />)
  screen.getByText(payload.title)
  screen.getByText(payload.category.name)
  screen.getByText(formatDate(payload.publishedAt))
})
