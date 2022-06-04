import React, { memo } from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Link as Scroll } from 'react-scroll'
import { Heading, Text, Box, Image, Link } from '@chakra-ui/react'
import parse, { DOMNode, domToReact } from 'html-react-parser'
import Disqus from 'disqus-react'

import { BlogCard } from '@/components/molecules/blog/BlogCard'

import { BlogDetailProps } from '@/pages/blog/[id]'
import { formatDate } from '@/utils/format'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useClient } from '@/hooks/useClient'

import * as styles from '@/styles'

type ReplaceDOMNode = DOMNode & {
  name?: string
  attribs?: {
    href?: string
  }
  children?: DOMNode[]
}

const disqusShortName = process.env.NEXT_PUBLIC_DISQUS_SHORT_NAME

const Main: NextPage<BlogDetailProps> = ({ data, cardData, toc }) => {
  const isMobile = useBreakpoint()
  const isClient = useClient()

  const disqusConfig = {
    url: `https://iwtttter.tech/blog/${data.id}`,
    identifier: data.id,
    title: data.title,
  }

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
    <>
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
      <Text mb={8}>
        投稿日&ensp;{formatDate(data.publishedAt ?? data.createdAt)}
      </Text>
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
      <Disqus.DiscussionEmbed
        shortname={disqusShortName}
        config={disqusConfig}
      />
    </>
  )
}

export default memo(Main)
