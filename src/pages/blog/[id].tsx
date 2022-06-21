import React from 'react'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import { NextSeo } from 'next-seo'
import cheerio from 'cheerio'
import { ParsedUrlQuery } from 'querystring'
import parse, { DOMNode, domToReact } from 'html-react-parser'
import { Link as Scroll } from 'react-scroll'
import { Heading, Text, Box, Image, Link } from '@chakra-ui/react'

import { BlogCard } from '@/components/Element/Card'
import { MainLayout } from '@/components/Layout'

import { microClient } from '@/lib/aspida'
import { codeHighlight } from '@/utils/code-highlight'
import { blogCard } from '@/utils/blog-card'
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
type ReplaceDOMNode = DOMNode & {
  name?: string
  attribs?: {
    href?: string
  }
  children?: DOMNode[]
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
    cardData: await blogCard($),
    toc: generateToc($),
  }

  return {
    props,
    revalidate: 10,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = ({
  data,
  cardData,
  toc,
}) => {
  const isMobile = useBreakpoint()
  const isClient = useClient()

  const replace = (node: ReplaceDOMNode) => {
    if (node.name === 'a' && node.children) {
      // 文中テキストリンクならばそのまま出力する
      const text = (node.children[0] as any).data
      if (!/^http/.test(text)) {
        return (
          <Link color="blue.500" href={node.attribs?.href} target="_blank">
            {domToReact(node.children)}
          </Link>
        )
      }
      const indexOfUrl = cardData.findIndex((x) => {
        return x && x.url.indexOf(`${node.attribs?.href}`) !== -1
      })
      return (
        <BlogCard cardData={cardData[indexOfUrl]}>
          {domToReact(node.children)}
        </BlogCard>
      )
    }
  }

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
        <Text mb={1}>投稿日&ensp;{formatDate(data.publishedAt)}</Text>
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
        <div>{isClient && parse(data.content, { replace })}</div>
      </Box>
    </MainLayout>
  )
}

export default BlogId

BlogId.getLayout = (page) => page
