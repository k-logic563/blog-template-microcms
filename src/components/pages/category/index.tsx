import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import List from '@/components/organisms/blog/List'
import Pagination from '@/components/organisms/Pagination'
import { CategoryPageProps } from '@/pages/blog/category/[catId]/[pageId]'

export const Main: NextPage<CategoryPageProps> = ({
  data,
  catName,
  pageId,
  catId,
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
        <Heading mb={4} as="h2" fontSize={['base', 'lg', '2xl']}>
          カテゴリー&ensp;【{catName}】
        </Heading>
        {data.contents.length !== 0 ? (
          <>
            <Box mb={10}>
              <List contents={data.contents} />
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
