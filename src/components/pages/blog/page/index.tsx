import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import List from '@/components/organisms/blog/List'
import { BlogPageProps } from '@/pages/blog/page/[pageId]'
import Pagination from '@/components/organisms/Pagination'

export const Main: NextPage<BlogPageProps> = ({ data, pageId }) => {
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
        <List contents={data.contents} />
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
