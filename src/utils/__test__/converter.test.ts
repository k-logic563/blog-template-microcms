import { faker } from '@faker-js/faker'

import { encodeUrl } from '@/utils/converter'

test('クエリオブジェクトをurl形式に変換', () => {
  const query = {
    keyword: faker.lorem.word(),
    category: faker.music.genre(),
  }

  expect(encodeUrl(query)).toBe(
    `keyword=${query.keyword}&category=${query.category}`
  )
})
