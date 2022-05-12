import React from 'react'
import type { NextPageWithLayout } from 'next'
import { Box, Text, Heading, Image } from '@chakra-ui/react'

import Layout from '@/layout'

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <Box mb={8}>
        <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
          このサイトについて
        </Heading>
        <Text mb={4}>
          このサイトは、フロントエンジニア「iwt」のコード遊びの記録です。
        </Text>
        <Text mb={4}>
          普段の業務上で知り得た知識と経験、あとは個人開発での知見など、備忘録として残していこうかと考えています。
        </Text>
      </Box>
      <Box>
        <Heading as="h2" fontSize={{ base: '18px', md: '24px' }} mb={4}>
          プロフィール
        </Heading>
        <Image
          mb={4}
          w={{ sm: '50%' }}
          rounded="5px"
          src="/assets/images/iwt.jpg"
          alt="iwt"
        />
        <Text mb={4}>
          改めまして、iwtです。フロントエンドエンジニアをしています。
        </Text>
        <Text mb={4}>
          趣味は筋トレ、読書、ドラム演奏です。
          <br />
          カメラを構えていますが、趣味ではありません。
        </Text>
        <Text mb={4}>
          得意技はキャラクターのセリフ覚え、再現です。大体の雰囲気を掴んでそれなりに再現できます。女性キャラクター以外はですが。
        </Text>
        <Text>ざっとこんな感じです。よろしくお願いします。</Text>
      </Box>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = (page) => <Layout>{page}</Layout>
