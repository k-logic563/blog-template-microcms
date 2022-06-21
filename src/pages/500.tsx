import React from 'react'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { Button, Heading, Text } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'

const Custom500: NextPageWithLayout = () => {
  return (
    <>
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        500 - Server-side error occurred
      </Heading>
      <Text mb={8}>サーバーサイドでの処理で何かの不具合が発生しました。</Text>
      <Link href="/" color="white">
        <Button colorScheme="teal" size="md" rounded="5px">
          トップページへ戻る
        </Button>
      </Link>
    </>
  )
}

export default Custom500

Custom500.getLayout = (page) => <MainLayout>{page}</MainLayout>
