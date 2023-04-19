import { CheerioAPI } from 'cheerio'
import hljs from 'highlight.js'

export const codeHighlight = ($: CheerioAPI) => {
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
}

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

export const generateToc = ($: CheerioAPI) => {
  const headings = $('h2, h3, h4').toArray()

  if (headings.length < 3) return []

  return headings.map((x) => ({
    text: (x.children[0] as any).data,
    id: x.attribs.id,
    name: x.name,
  }))
}
