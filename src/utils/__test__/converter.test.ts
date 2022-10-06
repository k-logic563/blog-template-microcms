import { faker } from '@faker-js/faker'

import { encodeUrl } from '@/utils/converter'

test('クエリオブジェクトをurl形式に変換', () => {
  const query = {
    keyword: faker.random.word(),
    category: faker.random.word(),
  }

  expect(encodeUrl(query)).toBe(
    `keyword=${query.keyword}&category=${query.category}`
  )
})
