import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'
import { List } from '@/components/List'
import { Pagination } from '@/components/Element/Pagination'

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
  return (
    <>
      <NextSeo
        title={`タグ【${tagName}】記事一覧ページ`}
        description={`タグ【${tagName}】の記事一覧ページです`}
        openGraph={{
          title: `タグ【${tagName}】記事一覧ページ`,
          description: `タグ【${tagName}】の記事一覧ページです`,
          url: `https://iwtttter.tech/blog/tag/${tagId}/${pageId}`,
        }}
      />
      <Box>
        <Heading mb={4} as="h2" fontSize={['base', 'lg', '2xl']}>
          タグ&ensp;【{tagName}】
        </Heading>
        {data.contents.length !== 0 ? (
          <>
            <Box mb={10}>
              <List<TagPageProps['data']['contents']>
                contents={data.contents}
              />
            </Box>
            <Box textAlign="center">
              <Pagination
                totalCount={data.totalCount}
                path={`blog/tag/${tagId}`}
                pageId={Number(pageId)}
              />
            </Box>
          </>
        ) : (
          <p>記事がありません</p>
        )}
      </Box>
    </>
  )
}

export default CategoryPage

CategoryPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
