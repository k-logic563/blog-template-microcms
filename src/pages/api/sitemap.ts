import { NextApiRequest, NextApiResponse } from 'next'

import { microClient } from '@/lib/aspida'
import { formatSitemapDate } from '@/utils/format'

async function generateSitemapXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  // ここでurlを足していく
  const { contents } = await microClient.blogs.$get()
  contents.forEach((post) => {
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const xml = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)
}
