import React from 'react'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { Button, Heading, Text } from '@chakra-ui/react'

import Layout from '@/layout'

const Custom500: NextPageWithLayout = () => {
  return (
    <>
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        500 - Server-side error occurred
      </Heading>
      <Text mb={8}>サーバーサイドで何かの不具合が発生しました。</Text>
      <Link href="/" color="white">
        <Button colorScheme="teal" size="md" rounded="5px">
          トップページへ戻る
        </Button>
      </Link>
    </>
  )
}

export default Custom500

Custom500.getLayout = (page) => <Layout>{page}</Layout>
