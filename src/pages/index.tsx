import React from 'react'
import Link from 'next/link'
import type { InferGetStaticPropsType, NextPageWithLayout } from 'next'
import { Box, Heading, Button, Text } from '@chakra-ui/react'

import { List } from '@/components/List'
import { microClient } from '@/lib/aspida'
import { MainLayout } from '@/components/Layout'

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const response = await microClient.blogs.$get({
    query: { limit: 6, offset: 0 },
  })
  return {
    props: {
      response,
    },
    revalidate: 10,
  }
}

const HomePage: NextPageWithLayout<HomeProps> = ({ response }) => {
  const contents = response.contents
  return (
    <Box>
      <Heading
        mb={4}
        as="h2"
        fontSize={{ base: '18px', md: '22px', lg: '26px' }}
      >
        最新記事
      </Heading>
      {contents.length !== 0 ? (
        <>
          <List contents={contents} />
          <Box textAlign="center" mt={8}>
            <Link href="/blog/page/1" color="white">
              <Button colorScheme="teal" size="md" rounded="5px">
                一覧を見る
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <Text>記事がありません。</Text>
      )}
    </Box>
  )
}

export default HomePage

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>
