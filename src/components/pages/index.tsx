import React from 'react'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { Box, Heading, Button } from '@chakra-ui/react'

import { HomeProps } from '@/pages'
import List from '@/components/organisms/blog/List'

export const Main: NextPageWithLayout<HomeProps> = ({ response }) => {
  const contents = response.contents

  return (
    <>
      <Box mb={8}>
        <Heading mb={4} as="h2" fontSize={['base', 'lg', '2xl']}>
          最新記事
        </Heading>
        <List contents={contents} />
      </Box>
      <Box textAlign="center">
        <Link href="/blog/page/1" color="white">
          <Button colorScheme="teal" size="md">
            一覧を見る
          </Button>
        </Link>
      </Box>
    </>
  )
}
