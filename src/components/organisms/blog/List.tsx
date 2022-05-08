import React from 'react'
import Link from 'next/link'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { Box, SimpleGrid, Text, Tag, TagLabel } from '@chakra-ui/react'

import { formatDate } from '@/utils/dateUtils'
import { Content } from '@/api/types'
import * as styles from '@/styles'

type Props = {
  contents: (Content & MicroCMSContentId & MicroCMSDate)[]
}

const List: React.FC<Props> = ({ contents }) => {
  return (
    <SimpleGrid columns={{ sm: 2 }} spacing={6}>
      {contents.map((item) => (
        <Box key={item.id} w="100%" py={7} px={6} shadow="xl" rounded="10px">
          <Text mb={2}>{formatDate(item.publishedAt)}</Text>
          <Text
            fontSize={{ base: '18px', lg: '20px' }}
            fontWeight="bold"
            mb={4}
          >
            <Link href={`/blog/${item.id}`} passHref>
              <a css={styles.blog.listLink}>{item.title}</a>
            </Link>
          </Text>
          <Tag size="sm" variant="outline" colorScheme="teal">
            <TagLabel>{item.category.name}</TagLabel>
          </Tag>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default List
