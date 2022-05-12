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
  const $ = cheerio.load(res.content)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
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
      toc,
    },
    revalidate: 1,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = (props) => {
  return <Main {...props} />
}

export default BlogId

BlogId.getLayout = (page) => <Layout>{page}</Layout>
