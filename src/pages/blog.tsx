import { useState, useMemo } from 'react'
import axios from 'axios'
import { InferGetStaticPropsType, NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { CustomButton } from '@/components/Element/Button'

import { Title } from '@/components/Heading/Title'
import { List } from '@/components/List'
import { MainLayout } from '@/components/Layout'

import { client } from '@/lib/microcms'
import { BlogContent } from '@/types/microcms'

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

const limit = 9

export const getStaticProps = async () => {
  const data = await client.get<BlogContent>({
    endpoint: 'blogs',
    queries: {
      limit,
    },
  })

  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}

const BlogPage: NextPageWithLayout<BlogPageProps> = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
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
      <NextSeo title="記事一覧ページ" description="記事一覧ページです" />
      <div className="mb-10">
        <Title title="記事一覧" subTitle="Blog" />
      </div>
      {items.length !== 0 ? (
        <div className="mb-12">
          <List contents={items} />
        </div>
      ) : (
        <p>記事がありません</p>
      )}
      {isFetchAll && (
        <div className="text-center">
          <CustomButton
            handleClick={fetchData}
            disabled={isLoading}
            text={`残り${contentCount}記事`}
          />
        </div>
      )}
    </>
  )
}

export default BlogPage

BlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
