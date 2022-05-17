import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Link as Scroll } from 'react-scroll'
import { Heading, Text, Box, Image, Link } from '@chakra-ui/react'
import parse, { domToReact } from 'html-react-parser'

import { BlogDetailProps } from '@/pages/blog/[id]'
import { formatDate } from '@/utils/dateUtils'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useClient } from '@/hooks/useClient'

import { CardProps } from '@/pages/blog/[id]'
import * as styles from '@/styles'
import 'highlight.js/styles/atom-one-dark.css'

type Props = {
  cardData: CardProps | void
  children: React.ReactNode
}

const BlogCard: React.FC<Props> = ({ cardData, children }) => {
  if (cardData) {
    if (cardData.title) {
      return (
        <Link
          css={styles.blog.blogCard}
          href={cardData.url}
          target="_blank"
          rel="noreferrer noopener"
          my={4}
        >
          <Image
            css={styles.blog.blogCardImage}
            src={
              cardData.image ? cardData.image : '/assets/images/no-image.jpg'
            }
            alt=""
          />
          <Text as="span" display="block" p={4}>
            <Text as="span" css={styles.blog.blogCardTitle} noOfLines={2}>
              {cardData.title && cardData.title}
            </Text>
            <Text as="span" css={styles.blog.blogCardDesc} noOfLines={1}>
              {cardData.description && cardData.description}
            </Text>
          </Text>
        </Link>
      )
    }
    return <a href={cardData.url}>{children}</a>
  }
  return null
}

export const Main: NextPage<BlogDetailProps> = ({ data, cardData, toc }) => {
  const isMobile = useBreakpoint()
  const isClient = useClient()
  // TODO:any
  const replace = (node: any) => {
    if (node.name === 'a') {
      const indexOfUrl = cardData.findIndex((obj) => {
        return obj && obj.url.indexOf(node.attribs?.href) !== -1
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
      <Box css={styles.blog.contents}>
        <div>{isClient && parse(data.content, { replace })}</div>
      </Box>
    </>
  )
}
