import { CheerioAPI } from 'cheerio'

export const generateToc = ($: CheerioAPI) => {
  const headings = $('h2, h3, h4').toArray()

  if (headings.length < 3) return []

  return headings.map((x) => ({
    text: (x.children[0] as any).data,
    id: x.attribs.id,
    name: x.name,
  }))
}
