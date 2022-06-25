import React from 'react'
import { Image, Link, Text } from '@chakra-ui/react'

import * as styles from '@/styles'

type Props = {
  cardData:
    | {
        title: string
        description: string
        url: string
        image: string
        siteName: string
      }
    | undefined
  children: React.ReactNode
}

export const BlogCard: React.FC<Props> = ({ cardData, children }) => {
  if (cardData) {
    if (cardData.title && cardData.url) {
      return (
        <Link
          css={styles.blog.blogCard}
          href={cardData.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            className="blog-card-image"
            css={styles.blog.blogCardImage}
            src={cardData.image}
            alt=""
          />
          <Text as="span" css={styles.blog.blogCardInner} display="block">
            <Text as="span">
              <Text as="span" css={styles.blog.blogCardTitle} noOfLines={2}>
                {cardData.title}
              </Text>
              <Text as="span" css={styles.blog.blogCardDesc} noOfLines={1}>
                {cardData.description}
              </Text>
            </Text>
            {cardData.siteName && (
              <Text as="span" css={styles.blog.blogCardSiteName}>
                {cardData.siteName}
              </Text>
            )}
          </Text>
        </Link>
      )
    }
    return (
      <Link color="blue.500" href={cardData.url} target="_blank">
        {children}
      </Link>
    )
  }
  return <Text as="span">{children}</Text>
}
