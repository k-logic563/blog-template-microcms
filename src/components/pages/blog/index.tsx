import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box, Image } from '@chakra-ui/react'

import { BlogDetailProps } from '@/pages/blog/[id]'
import { formatDate } from '@/utils/dateUtils'
import * as styles from '@/styles'

import 'highlight.js/styles/atom-one-dark.css'

export const Main: NextPage<BlogDetailProps> = ({ data, toc }) => {
  return (
    <>
      <NextSeo
        title={`${data.title}:my-micro-blog`}
        description="記事詳細ページです。"
      />
      <Heading as="h1" fontSize={{ base: '24px', lg: '32px' }} mb={4}>
        {data.title}
      </Heading>
      <Text mb={8}>投稿日&ensp;{formatDate(data.publishedAt)}</Text>
      <Box mb={6}>
        <Image src={data.eyecatch.url} alt="" />
      </Box>
      {toc?.length !== 0 && (
        <Box px={4} py={6} bg="gray.100" rounded="5px">
          <Text
            fontSize={{ base: '16px', lg: '20px' }}
            fontWeight="bold"
            mb={3}
          >
            目次
          </Text>
          <ul css={styles.blog.tocList}>
            {toc.map((x) => (
              <li className={x.name} key={x.id}>
                <a href={`#${x.id}`}>{x.text}</a>
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Box css={styles.blog.contents}>
        <div dangerouslySetInnerHTML={{ __html: `${data.content}` }} />
      </Box>
    </>
  )
}
