import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import { NextSeo } from 'next-seo'
import cheerio from 'cheerio'
import { ParsedUrlQuery } from 'querystring'
import { Link as Scroll } from 'react-scroll'
import { Heading, Text, Box, Image } from '@chakra-ui/react'

import { MainLayout } from '@/components/Layout'

import { microClient } from '@/lib/aspida'
import { codeHighlight } from '@/utils/code-highlight'
import { generateToc } from '@/utils/toc'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useClient } from '@/hooks/useClient'
import { formatDate } from '@/utils/format'

import * as styles from '@/styles'

import 'highlight.js/styles/atom-one-dark.css'

type BlogDetailProps = InferGetStaticPropsType<typeof getStaticProps>
type Params = ParsedUrlQuery & {
  id: string
}

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

export const getStaticPaths = async () => {
  const data = await microClient.blogs.$get()
  const paths = data.contents.map((x) => `/blog/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params, previewData } = ctx
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const res = await microClient.blogs
    ._id(`${params?.id}`)
    .$get({ query: { draftKey } })
  const $ = cheerio.load(res.content, null, false)

  // コードハイライト
  codeHighlight($)

  // ブログカード、目次、記事データを集約
  const props = {
    data: { ...res, content: $.html() },
    toc: generateToc($),
  }

  return {
    props,
    revalidate: 60,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = ({
  data,
  toc,
}) => {
  const isMobile = useBreakpoint()
  const isClient = useClient()

  return (
    <MainLayout toc={toc}>
      <NextSeo
        title={`${data.title}`}
        description={data.description}
        openGraph={{
          title: `${data.title}`,
          description: data.description,
          url: `https://iwtttter.tech/blog/${data.id}`,
        }}
        twitter={{
          site: `https://iwtttter.tech/blog/${data.id}`,
        }}
      />
      <Heading as="h1" fontSize={{ base: '24px', lg: '32px' }} mb={4}>
        {data.title}
      </Heading>
      <Box mb={8}>
        {data.publishedAt && (
          <Text mb={1}>投稿日&ensp;{formatDate(data.publishedAt)}</Text>
        )}
        {data.updatedAt && (
          <Text>更新日&ensp;{formatDate(data.updatedAt)}</Text>
        )}
      </Box>
      <Box mb={6}>
        <Image src={data.eyecatch.url} alt="" />
      </Box>
      {isClient && isMobile && toc?.length !== 0 && (
        <Box px={4} py={6} mb={10} bg="gray.100" rounded="5px">
          <Text
            fontSize={{ base: '16px', lg: '20px' }}
            fontWeight="bold"
            mb={3}
          >
            目次
          </Text>
          <ul css={styles.blog.tocList}>
            {toc.map((x) => (
              <li className={x.name} key={x.id}>
                <Scroll to={x.id} smooth offset={-100}>
                  {x.text}
                </Scroll>
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Box mb={12} css={styles.blog.contents}>
        { isClient && <div dangerouslySetInnerHTML={{ __html: data.content }} /> }
      </Box>
    </MainLayout>
  )
}

export default BlogId

BlogId.getLayout = (page) => page
