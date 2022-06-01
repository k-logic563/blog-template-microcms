import React from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'

import { Main } from '@/components/pages/blog/page'
import Layout from '@/layout'

import { microClient } from '@/utils/httpUtils'
import { range } from '@/utils/blogUtils'
import { perPage } from '@/constants/pagination'

export type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = {
  pageId: string
}

export const getStaticPaths = async () => {
  const data = await microClient.blogs.$get()
  const paths = range(1, Math.ceil(data.totalCount / perPage)).map(
    (repo) => `/blog/page/${repo}`
  )

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params } = ctx

  if (!params?.pageId) {
    throw new Error('pageID not found.')
  }

  const data = await microClient.blogs.$get({
    query: {
      offset: (Number(params?.pageId) - 1) * perPage,
      limit: perPage,
    },
  })

  return {
    props: {
      data,
      pageId: params?.pageId,
    },
    revalidate: 10,
  }
}

const BlogPageId: NextPageWithLayout<BlogPageProps> = ({ data, pageId }) => {
  return <Main data={data} pageId={pageId} />
}

export default BlogPageId

BlogPageId.getLayout = (page) => <Layout>{page}</Layout>
