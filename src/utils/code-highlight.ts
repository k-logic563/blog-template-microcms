import { CheerioAPI } from 'cheerio'
import hljs from 'highlight.js'

export const codeHighlight = ($: CheerioAPI) => {
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
}
