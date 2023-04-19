import { NextApiResponse } from 'next'

import { client } from '@/lib/microcms'
import { BlogContent } from '@/types/microcms'
import { formatSitemapDate } from '@/utils/format'

async function generateSitemapXml() {
  // 全件取得のための関数
  const getAllContents = async (
    limit = 10,
    offset = 0
  ): Promise<BlogContent['contents']> => {
    const data = await client.get({
      endpoint: 'blogs',
      queries: {
        offset,
        limit,
      },
    })

    if (data.offset + data.limit < data.totalCount) {
      const contents = await getAllContents(
        data.limit,
        data.offset + data.limit
      )
      return [...data.contents, ...contents]
    }

    return data.contents
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const allContents = await getAllContents()
  allContents.forEach((post) => {
    xml += `
      <url>
        <loc>https://{your-domain}/blog/${post.id}</loc>
        <lastmod>${formatSitemapDate(post.publishedAt)}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `
  })

  xml += `</urlset>`
  return xml
}

export default async (_: unknown, res: NextApiResponse) => {
  const xml = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)
}
