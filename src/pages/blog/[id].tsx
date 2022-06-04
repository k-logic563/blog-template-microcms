import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import cheerio from 'cheerio'
import { ParsedUrlQuery } from 'querystring'

import Layout from '@/layout'
import Main from '@/components/pages/blog'

import { microClient } from '@/lib/aspida'
import { codeHighlight } from '@/utils/code-highlight'
import { blogCard } from '@/utils/blog-card'
import { generateToc } from '@/utils/toc'

import 'highlight.js/styles/atom-one-dark.css'

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
  codeHighlight($)

  // ブログカード、目次、記事データを集約
  const props = {
    data: { ...res, content: $.html() },
    cardData: await blogCard($),
    toc: generateToc($),
  }

  return {
    props,
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
