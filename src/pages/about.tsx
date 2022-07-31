import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading, Image, Text, HStack } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="このサイトについて"
        openGraph={{
          title: 'このサイトについて',
          description: 'iwtttter-blogサイトについての紹介ページです。',
          url: 'https://iwtttter.tech/about',
        }}
      />
      <Box>
        <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
          このサイトについて
        </Heading>
        <Box lineHeight={1.8}>
          <Text mb={4}>
            このサイトは日頃の業務から個人開発まで、気づきや勉強になったことをまとめるテックブログサイトになります。
            <br />
            「あれ？前も同じ問題に出会った気がするなぁ。」をなるべく減らすために、自分がつまづいた部分も積極的に記事にまとめていきます。
          </Text>
          <Text mb={8}>
            なるべく思った時に更新するようにしていますが、怠け癖があるため、更新頻度にばらつきがあります。人間だもの。
          </Text>
          <HStack columnGap={2}>
            <Image
              w="80px"
              h="80px"
              rounded="full"
              objectFit="cover"
              src="/assets/images/iwt.jpg"
              alt="iwt"
            />
            <Text>いわを</Text>
          </HStack>
        </Box>
      </Box>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
