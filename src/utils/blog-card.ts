import { CheerioAPI } from 'cheerio'
import parser from 'ogp-parser'

export const blogCard = async ($: CheerioAPI) => {
  const links = $('a')
    .toArray()
    .map((data) => {
      const url =
        data.attribs.href.indexOf('http') === -1
          ? `${process.env.NEXT_PUBLIC_BASE_URL}${data.attribs.href}`
          : data.attribs.href
      return { url }
    })
  const promises = links.map(({ url }) => parser(url, { skipOembed: true }))
  const resultLinkParsers = await Promise.allSettled(promises)
  return resultLinkParsers.map((x, idx) => {
    if (x.status === 'fulfilled') {
      const ogpData = x.value.ogp
      return {
        title: ogpData['og:title'] ? ogpData['og:title'][0] : '',
        description: ogpData['og:description']
          ? ogpData['og:description'][0]
          : '',
        url: ogpData['og:url'] ? ogpData['og:url'][0] : links[idx].url,
        image: ogpData['og:image']
          ? ogpData['og:image'][0]
          : '/assets/images/no-image.jpg',
        siteName: ogpData['og:site_name'] ? ogpData['og:site_name'][0] : '',
      }
    }
  })
}
