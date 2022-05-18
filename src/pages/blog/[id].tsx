import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import parser, { OgpParserResult } from 'ogp-parser'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import { ParsedUrlQuery } from 'querystring'

import Layout from '@/layout'
import { Main } from '@/components/pages/blog'

import { client } from '@/utils/httpUtils'

export type BlogDetailProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = ParsedUrlQuery & {
  id: string
}

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

export const getStaticPaths = async () => {
  const data = await client.blogs.$get()
  const paths = data.contents.map((x) => `/blog/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params, previewData } = ctx
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const res = await client.blogs
    ._id(`${params?.id}`)
    .$get({ query: { draftKey } })
  const $ = cheerio.load(res.content, null, false)

  // コードハイライト
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  // ブログカード
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
  const cardData = resultLinkParsers.map((x) => {
    if (x.status === 'fulfilled') {
      const ogpData = x.value.ogp
      return {
        title: ogpData['og:title'] ?? '',
        description: ogpData['og:description'] ?? '',
        image: ogpData['og:image'] ?? '/assets/images/no-image.jpg',
        url: ogpData['og:url'] ?? '',
      }
    }
  })

  // 目次
  const headings = $('h2, h3, h4').toArray()
  const toc = headings.map((x) => ({
    text: (x.children[0] as any).data,
    id: x.attribs.id,
    name: x.name,
  }))
  const data = { ...res, content: $.html() }

  return {
    props: {
      data,
      cardData,
      toc,
    },
    revalidate: 1,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = (props) => {
  return (
    <Layout toc={props.toc}>
      <Main {...props} />
    </Layout>
  )
}

export default BlogId

BlogId.getLayout = (page) => page
