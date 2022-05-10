import React from 'react'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { Box, Heading, Button, Text } from '@chakra-ui/react'

import { HomeProps } from '@/pages'
import List from '@/components/organisms/blog/List'

export const Main: NextPageWithLayout<HomeProps> = ({ response }) => {
  const contents = response.contents

  return (
    <>
      <Box>
        <Heading
          mb={4}
          as="h2"
          fontSize={{ base: '18px', md: '22px', lg: '26px' }}
        >
          最新記事
        </Heading>
        <List contents={contents} />
        <Box textAlign="center" mt={8}>
          <Link href="/blog/page/1" color="white">
            <Button colorScheme="teal" size="md" rounded="5px">
              一覧を見る
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}
