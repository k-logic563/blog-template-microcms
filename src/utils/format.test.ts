import { formatDate, formatSitemapDate } from '@/utils/format'

describe('日付の形式を変換', () => {
  it('ブログ表示フォーマット', () => {
    const date = '2022-01-01T00:00:00.000Z'
    expect(formatDate(date)).toBe('2022.01.01')
  })
  it('サイトマップ生成フォーマット', () => {
    const date = '2022-01-01T00:00:00.000Z'
    expect(formatSitemapDate(date)).toBe('2022-01-01')
  })
})
