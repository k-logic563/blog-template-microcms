import React from 'react'
import type { NextPageWithLayout } from 'next'
import Layout from '@/layout'
import { Heading, Text } from '@chakra-ui/react'

const Custom404: NextPageWithLayout = () => {
  return (
    <>
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        404 - Page Not Found
      </Heading>
      <Text>お探しのURLが見つかりませんでした。</Text>
    </>
  )
}

Custom404.getLayout = (page) => <Layout>{page}</Layout>
export default Custom404
