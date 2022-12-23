import { CheerioAPI } from 'cheerio'

export const removeTags = ($: CheerioAPI) => {
  $('p').each((_, elm) => {
    elm.childNodes.forEach((node) => {
      if ('name' in node) {
        // @ts-ignore
        if (node.name === 'br' && !$(elm).text()) {
          $(elm).remove()
        }
      }
    })
  })
}
