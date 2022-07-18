import React from 'react'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Text, Heading } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="お問い合わせ"
        openGraph={{
          title: 'お問い合わせ',
          description: 'iwtttter-blogサイトのお問い合わせページです。',
          url: 'https://iwtttter.tech/contact',
        }}
      />
      <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
        お問い合わせ
      </Heading>
      <Text>フォーム設置までお待ちください。</Text>
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
