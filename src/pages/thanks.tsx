import React from 'react'
import Link from 'next/link'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Text, Heading, Button } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'

const Thanks: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="お問い合わせ完了"
        openGraph={{
          title: 'お問い合わせ完了',
          description: 'iwtttter-blogサイトのお問い合わせ完了ページです。',
          url: 'https://iwtttter.tech/thanks',
        }}
        noindex
      />
      <Box>
        <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
          お問い合わせ完了しました
        </Heading>
        <Text lineHeight={1.8} mb={6}>
          お問い合わせいただき、誠にありがとうございます。
          <br />
          お返事まで少々お待ちくださいませ。
        </Text>
        <Link href="/" color="white">
          <Button colorScheme="teal" size="md" rounded="5px">
            トップページへ戻る
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default Thanks

Thanks.getLayout = (page) => <MainLayout>{page}</MainLayout>
