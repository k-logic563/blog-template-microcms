import {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPageWithLayout,
} from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import { List } from '@/components/List'
import { Pagination } from '@/components/Element/Pagination'
import { MainLayout } from '@/components/Layout'

import { range } from '@/utils/range'
import { microClient } from '@/lib/axios'
import { perPage } from '@/constants/pagination'

import { BlogContent, CategoryContent } from '@/types/type'

type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>
type Params = {
  pageId: string
  catId: string
}

const getAllCategoryPagePaths = async () => {
  const { data } = await microClient.get<CategoryContent>('categories')
  const paths = await Promise.all(
    data.contents.map((x) => {
      return microClient
        .get<BlogContent>('blogs', {
          params: { filters: `category[equals]${x.id}` },
        })
        .then(({ data }) => {
          return range(1, Math.ceil(data.totalCount / perPage)).map(
            (repo) => `/blog/category/${x.id}/${repo}`
          )
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

  const { data: blogs } = await microClient.get('blogs', {
    params: {
      filters: `category[equals]${params?.catId}`,
      offset: (Number(params?.pageId) - 1) * perPage,
      limit: perPage,
    },
  })
  const { data: category } = await microClient.get<CategoryContent>(
    'categories'
  )
  const catName =
    category.contents.find((x) => x.id === params?.catId)?.name ?? ''

  return {
    props: {
      data: blogs,
      catName,
      catId: params?.catId,
      pageId: params?.pageId,
    },
    revalidate: 10,
  }
}

const CategoryPage: NextPageWithLayout<CategoryPageProps> = ({
  data,
  catName,
  catId,
  pageId,
}) => {
  return (
    <>
      <NextSeo
        title={`カテゴリー【${catName}】記事一覧ページ`}
        description={`カテゴリー【${catName}】の記事一覧ページです`}
        openGraph={{
          title: `カテゴリー【${catName}】記事一覧ページ`,
          description: `カテゴリー【${catName}】の記事一覧ページです`,
          url: `https://iwtttter.tech/blog/category/${catId}/${pageId}`,
        }}
      />
      <Box>
        <Heading mb={6} as="h2" fontSize={['base', 'lg', '2xl']}>
          カテゴリー&ensp;【{catName}】
        </Heading>
        {data.contents.length !== 0 ? (
          <>
            <Box mb={10}>
              <List<CategoryPageProps['data']['contents']>
                contents={data.contents}
              />
            </Box>
            <Box textAlign="center">
              <Pagination
                totalCount={data.totalCount}
                path={`blog/category/${catId}`}
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
