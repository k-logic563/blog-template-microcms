import React from 'react'
import type { NextPageWithLayout } from 'next'
import { Heading, Text } from '@chakra-ui/react'
import Layout from '@/layout'

const Custom500: NextPageWithLayout = () => {
  return (
    <>
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        500 - Server-side error occurred
      </Heading>
      <Text>サーバーサイドで何かの不具合が発生しました。</Text>
    </>
  )
}

export default Custom500

Custom500.getLayout = (page) => <Layout>{page}</Layout>
