import { useState, useMemo } from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { Spinner } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { List } from '@/components/List'
import { MainLayout } from '@/components/Layout'

import { microClient } from '@/lib/axios'
import { sleep } from '@/utils'
import { BlogContent, CategoryContent } from '@/types/type'

type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>
type Params = {
  catId: string
}

const limit = 9

export const getStaticPaths = async () => {
  const { data } = await microClient.get<BlogContent>('categories')
  const paths = data.contents.map((x) => `/blog/category/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params } = ctx

  if (!params?.catId) {
    throw new Error('catId not found.')
  }

  const { data: blogs } = await microClient.get('blogs', {
    params: {
      filters: `category[equals]${params?.catId}`,
      limit,
    },
  })
  const { data: categories } = await microClient.get<CategoryContent>(
    'categories'
  )
  const catName =
    categories.contents.find((x) => x.id === params?.catId)?.name ?? ''

  return {
    props: {
      data: blogs,
      catName,
      catId: params?.catId,
    },
    revalidate: 10,
  }
}

const CategoryPage: NextPageWithLayout<CategoryPageProps> = ({
  data,
  catName,
  catId,
}) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [items, setItems] = useState<BlogContent['contents']>(data.contents)

  const isFetchAll = useMemo(() => {
    return data.totalCount > items.length || data.totalCount !== items.length
  }, [data, items])

  const fetchData = async () => {
    await sleep(1000)
    const { data } = await axios.get<BlogContent>('/api/blog/list', {
      params: {
        filters: `category[equals]${catId}`,
        offset: pageNumber * limit,
      },
    })

    setItems([...items, ...data.contents])
    setPageNumber(pageNumber + 1)
  }

  return (
    <>
      <NextSeo
        title={`カテゴリー【${catName}】記事一覧ページ`}
        description={`カテゴリー【${catName}】の記事一覧ページです`}
        openGraph={{
          title: `カテゴリー【${catName}】記事一覧ページ`,
          description: `カテゴリー【${catName}】の記事一覧ページです`,
          url: `https://iwtttter.tech/blog/category/${catId}`,
        }}
      />
      <div className="mb-10">
        <h1 className="font-bold text-[24px] md:text-[28px] mb-6">
          カテゴリー【{catName}】
        </h1>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          loader={
            <div className="mt-16 text-center">
              <Spinner color="teal.500" />
            </div>
          }
          hasMore={isFetchAll}
        >
          <List<CategoryPageProps['data']['contents']> contents={items} />
        </InfiniteScroll>
      </div>
    </>
  )
}

export default CategoryPage

CategoryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
