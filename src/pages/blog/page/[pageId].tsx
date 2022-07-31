import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import { List } from '@/components/List'
import { MainLayout } from '@/components/Layout'
import { Pagination } from '@/components/Element/Pagination'

import { microClient } from '@/lib/aspida'
import { range } from '@/utils/range'
import { perPage } from '@/constants/pagination'

type BlogPageProps = InferGetStaticPropsType<typeof getStaticProps>

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
  return (
    <>
      <NextSeo
        title="記事一覧ページ"
        description="記事一覧ページです"
        openGraph={{
          title: '記事一覧ページ',
          description: '記事一覧ページです',
          url: `https://iwtttter.tech/blog/page/${pageId}`,
        }}
      />
      <Box mb={10}>
        <Heading mb={4} as="h2" fontSize={['base', 'lg', '2xl']}>
          記事一覧
        </Heading>
        <List<BlogPageProps['data']['contents']> contents={data.contents} />
      </Box>
      <Box textAlign="center">
        <Pagination
          totalCount={data.totalCount}
          pageId={Number(pageId)}
          path={`blog/page`}
        />
      </Box>
    </>
  )
}

export default BlogPageId

BlogPageId.getLayout = (page) => <MainLayout>{page}</MainLayout>
