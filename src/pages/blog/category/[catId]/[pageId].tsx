import React from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'

import { Main } from '@/components/pages/category'
import Layout from '@/layout'

import { range } from '@/utils/blogUtils'
import { client } from '@/utils/httpUtils'
import { perPage } from '@/constants/pagination' 

export type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>

type Params = {
  pageId: string
  catId: string
}

const getAllCategoryPagePaths = async () => {
  const cats = await client.categories.$get()
  const paths = await Promise.all(
    cats.contents.map((x) => {
      return client.blogs
        .$get({
          query: { filters: `category[equals]${x.id}` },
        })
        .then((y) => {
          return range(
            1,
            Math.ceil(y.totalCount / perPage)
          ).map((repo) => `/blog/category/${x.id}/${repo}`)
        })
    })
  )
  return paths.flat()
}

export const getStaticPaths = async () => {
  const paths = await getAllCategoryPagePaths()

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

  if (!params?.catId) {
    throw new Error('catID not found.')
  }

  const data = await client.blogs.$get({
    query: {
      filters: `category[equals]${params?.catId}`,
      offset: (Number(params?.pageId) - 1) * perPage,
      limit: perPage,
    },
  })
  const categories = await client.categories.$get()
  const catName =
    categories.contents.find((x) => x.id === params?.catId)?.name ?? ''

  return {
    props: {
      data,
      catName,
      catId: params?.catId,
      pageId: params?.pageId,
    },
    revalidate: 1,
  }
}

const CategoryPage: NextPageWithLayout<CategoryPageProps> = ({
  data,
  catName,
  catId,
  pageId,
}) => {
  return <Main data={data} catName={catName} pageId={pageId} catId={catId} />
}

export default CategoryPage

CategoryPage.getLayout = (page) => <Layout>{page}</Layout>
