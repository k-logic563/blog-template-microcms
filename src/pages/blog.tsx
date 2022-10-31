import { useState, useMemo } from 'react'
import axios from 'axios'
import { InferGetStaticPropsType, NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Spinner } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Heading1 } from '@/components/Heading/Heading1'
import { List } from '@/components/List'
import { MainLayout } from '@/components/Layout'

import { microClient } from '@/lib/axios'
import { BlogContent } from '@/types/type'

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

const limit = 9

export const getStaticProps = async () => {
  const { data } = await microClient.get<BlogContent>('blogs', {
    params: {
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
  const [items, setItems] = useState<BlogContent['contents']>(data.contents)

  const isFetchAll = useMemo(() => {
    return data.totalCount > items.length
  }, [data, items])

  const fetchData = async () => {
    const { data } = await axios.get<BlogContent>('/api/blog/list', {
      params: {
        offset: pageNumber * limit,
        limit: pageNumber * limit + limit
      },
    })

    setItems([...items, ...data.contents])
    setPageNumber(pageNumber + 1)
  }

  return (
    <>
      <NextSeo
        title="記事一覧ページ"
        description="記事一覧ページです"
        openGraph={{
          title: '記事一覧ページ',
          description: '記事一覧ページです',
          url: 'https://iwtttter.tech/blog',
        }}
      />
      <div className="mb-10">
        <Heading1 title="記事一覧" subTitle="Blog" />
      </div>
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
        <List<BlogPageProps['data']['contents']> contents={items} />
      </InfiniteScroll>
    </>
  )
}

export default BlogPage

BlogPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
