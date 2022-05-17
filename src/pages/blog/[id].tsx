import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
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

export type CardProps = {
  title: string
  description: string
  url: string
  image: string
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
      return { url: url }
    })
  let cardData: (CardProps | void)[] = []
  const temps = await Promise.all(
    links.map(async (link) => {
      //fetchでurl先のhtmlデータを取得
      return await fetch(link.url)
        .then((res) => res.text())
        .then((text) => {
          //各サイトのmetaタグの情報をすべてmetasの配列に
          const $ = cheerio.load(text)
          const metas = $('meta').toArray()
          const metaData = {
            url: link.url,
            title: '',
            description: '',
            image: '',
          }
          //各サイトのmeta情報
          for (let i = 0; i < metas.length; i++) {
            if (metas[i].attribs?.property === 'og:title')
              metaData.title = metas[i].attribs.content
            if (metas[i].attribs?.property === 'og:description')
              metaData.description = metas[i].attribs.content
            if (metas[i].attribs?.property === 'og:image')
              metaData.image = metas[i].attribs.content
          }
          return metaData
        })
        .catch((e) => {
          console.log(e)
        })
    })
  )
  cardData = temps.filter((temp) => temp !== undefined)

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
