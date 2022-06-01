import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import parser from 'ogp-parser'
import cheerio from 'cheerio'
import hljs from 'highlight.js'
import { ParsedUrlQuery } from 'querystring'

import Layout from '@/layout'
import Main from '@/components/pages/blog'

import { microClient } from '@/utils/httpUtils'

export type BlogDetailProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = ParsedUrlQuery & {
  id: string
}

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

export const getStaticPaths = async () => {
  const data = await microClient.blogs.$get()
  const paths = data.contents.map((x) => `/blog/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params, previewData } = ctx
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const res = await microClient.blogs
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
  const cardData = resultLinkParsers.map((x, idx) => {
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
    revalidate: 10,
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
