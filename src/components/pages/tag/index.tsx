import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading } from '@chakra-ui/react'

import List from '@/components/organisms/blog/List'
import Pagination from '@/components/organisms/Pagination'
import { TagPageProps } from '@/pages/blog/tag/[tagId]/[pageId]'

export const Main: NextPage<TagPageProps> = ({
  data,
  tagName,
  pageId,
  tagId,
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
              <List contents={data.contents} />
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
