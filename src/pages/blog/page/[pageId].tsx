import React from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'

import { Main } from '@/components/pages/blog/page'
import Layout from '@/layout'

import { client } from '@/utils/httpUtils'
import { range } from '@/utils/blogUtils'
import * as constants from '@/constants'

export type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = {
  pageId: string
}

export const getStaticPaths = async () => {
  const data = await client.blogs.$get()
  const paths = range(
    1,
    Math.ceil(data.totalCount / constants.pagination.PER_PAGE)
  ).map((repo) => `/blog/page/${repo}`)

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

  const data = await client.blogs.$get({
    query: {
      offset: (Number(params?.pageId) - 1) * constants.pagination.PER_PAGE,
      limit: constants.pagination.PER_PAGE,
    },
  })

  return {
    props: {
      data,
      pageId: params?.pageId,
    },
    revalidate: 1,
  }
}

const BlogPageId: NextPageWithLayout<BlogPageProps> = ({ data, pageId }) => {
  return <Main data={data} pageId={pageId} />
}

export default BlogPageId

BlogPageId.getLayout = (page) => <Layout>{page}</Layout>
