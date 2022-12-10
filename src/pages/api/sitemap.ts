import { NextApiResponse } from 'next'

import { client } from '@/lib/microcms'
import { formatSitemapDate } from '@/utils/format'

import { BlogContent } from '@/types/type'

async function generateSitemapXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const data = await client.get<BlogContent>({
    endpoint: 'blogs',
  })
  data.contents.forEach((post) => {
    xml += `
      <url>
        <loc>https://iwtttter.tech/blog/${post.id}</loc>
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
