import React from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'

import { Main } from '@/components/pages/tag'

import Layout from '@/layout'
import { range } from '@/utils/blogUtils'
import { client } from '@/utils/httpUtils'
import * as constants from '@/constants'

export type TagPageProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = {
  pageId: string
  tagId: string
}

const getAllTagPagePaths = async () => {
  const tags = await client.tags.$get()
  const paths = await Promise.all(
    tags.contents.map((x) => {
      return client.blogs
        .$get({
          query: { filters: `tag[contains]${x.id}` },
        })
        .then((y) => {
          return range(
            1,
            Math.ceil(y.totalCount / constants.pagination.PER_PAGE)
          ).map((repo) => `/blog/tag/${x.id}/${repo}`)
        })
    })
  )
  return paths.flat()
}

export const getStaticPaths = async () => {
  const paths = await getAllTagPagePaths()

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

  if (!params?.tagId) {
    throw new Error('tagID not found.')
  }

  const data = await client.blogs.$get({
    query: {
      filters: `tag[contains]${params?.tagId}`,
      offset: (Number(params?.pageId) - 1) * constants.pagination.PER_PAGE,
      limit: constants.pagination.PER_PAGE,
    },
  })
  const tags = await client.tags.$get()
  const tagName = tags.contents.find((x) => x.id === params?.tagId)?.name ?? ''

  return {
    props: {
      data,
      tagName,
      tagId: params?.tagId,
      pageId: params?.pageId,
    },
    revalidate: 1,
  }
}

const CategoryPage: NextPageWithLayout<TagPageProps> = ({
  data,
  tagName,
  tagId,
  pageId,
}) => {
  return <Main data={data} tagName={tagName} pageId={pageId} tagId={tagId} />
}

export default CategoryPage

CategoryPage.getLayout = (page) => <Layout>{page}</Layout>
