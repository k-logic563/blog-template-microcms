import { formatDate } from '@/utils/format'

test('日付の形式を変換', () => {
  const date = '2022-01-01T00:00:00.000Z'
  expect(formatDate(date)).toBe('2022.01.01')
})
