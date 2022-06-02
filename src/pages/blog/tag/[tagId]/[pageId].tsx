import React from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'

import { Main } from '@/components/pages/tag'
import Layout from '@/layout'

import { range } from '@/utils/range'
import { microClient } from '@/lib/aspida'
import { perPage } from '@/constants/pagination'

export type TagPageProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = {
  pageId: string
  tagId: string
}

const getAllTagPagePaths = async () => {
  const tags = await microClient.tags.$get()
  const paths = await Promise.all(
    tags.contents.map((x) => {
      return microClient.blogs
        .$get({
          query: { filters: `tag[contains]${x.id}` },
        })
        .then((y) => {
          return range(1, Math.ceil(y.totalCount / perPage)).map(
            (repo) => `/blog/tag/${x.id}/${repo}`
          )
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

  const data = await microClient.blogs.$get({
    query: {
      filters: `tag[contains]${params?.tagId}`,
      offset: (Number(params?.pageId) - 1) * perPage,
      limit: perPage,
    },
  })
  const tags = await microClient.tags.$get()
  const tagName = tags.contents.find((x) => x.id === params?.tagId)?.name ?? ''

  return {
    props: {
      data,
      tagName,
      tagId: params?.tagId,
      pageId: params?.pageId,
    },
    revalidate: 10,
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
