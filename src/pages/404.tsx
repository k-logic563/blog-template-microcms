import React from 'react'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { Button, Heading, Text } from '@chakra-ui/react'

import Layout from '@/layout'

const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        404 - Page Not Found
      </Heading>
      <Text mb={8}>お探しのURLが見つかりませんでした。</Text>
      <Link href="/" color="white">
        <Button colorScheme="teal" size="md" rounded="5px">
          トップページへ戻る
        </Button>
      </Link>
    </>
  )
}

Custom404.getLayout = (page) => <Layout>{page}</Layout>
export default Custom404
