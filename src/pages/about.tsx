import React from 'react'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Heading, Image, Table, Tbody, Tr, Td } from '@chakra-ui/react'

import Layout from '@/layout'

import { profiles } from '@/constants/pages'

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
          プロフィール
        </Heading>
        <Image mb={4} rounded="5px" src="/assets/images/iwt.jpg" alt="iwt" />
        <Table variant="simple">
          <Tbody>
            {profiles.map((x, idx) => (
              <Tr key={idx}>
                <Td fontWeight="bold" whiteSpace="nowrap">
                  {x.title}
                </Td>
                <Td
                  lineHeight="1.8"
                  dangerouslySetInnerHTML={{ __html: x.description }}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = (page) => <Layout>{page}</Layout>
