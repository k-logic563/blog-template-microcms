import { useState, useMemo } from 'react'
import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import axios from 'axios'
import { NextSeo } from 'next-seo'

import { Title } from '@/components/Heading/Title'
import { List } from '@/components/List'
import { MainLayout } from '@/components/Layout'
import { CustomButton } from '@/components/Element/Button'

import { client } from '@/lib/microcms'
import { BlogContent, CategoryContent } from '@/types/microcms'

type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>
type Params = {
  catId: string
}

const limit = 9

export const getStaticPaths = async () => {
  const data = await client.get<BlogContent>({
    endpoint: 'categories',
  })
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

  const blogs = await client.get<BlogContent>({
    endpoint: 'blogs',
    queries: {
      filters: `category[equals]${params?.catId}`,
      limit,
    },
  })
  const categories = await client.get<CategoryContent>({
    endpoint: 'categories',
  })
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
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [items, setItems] = useState<BlogContent['contents']>(data.contents)

  const isFetchAll = useMemo(() => {
    return data.totalCount > items.length
  }, [data, items])

  const contentCount = useMemo(() => {
    return data.totalCount - items.length
  }, [data, items])

  const fetchData = async () => {
    setIsLoading(true)

    const { data } = await axios.get<BlogContent>('/api/blog/list', {
      params: {
        filters: `category[equals]${catId}`,
        offset: pageNumber * limit,
        limit,
      },
    })

    setItems([...items, ...data.contents])
    setPageNumber(pageNumber + 1)
    setIsLoading(false)
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
        <div className="mb-10">
          <Title title={catName} subTitle="Category" />
        </div>
        <div className="mb-12">
          <List contents={items} />
        </div>
        {isFetchAll && (
          <div className="text-center">
            <CustomButton
              text={`残り${contentCount}記事`}
              disabled={isLoading}
              handleClick={fetchData}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default CategoryPage

CategoryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
