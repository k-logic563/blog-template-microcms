import React from 'react'
import Link from 'next/link'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import {
  Box,
  Image,
  Stack,
  VStack,
  Text,
  Tag,
  TagLabel,
  Icon,
} from '@chakra-ui/react'
import { AiOutlineFieldTime } from 'react-icons/ai'

import { formatDate } from '@/utils/dateUtils'
import { Content } from '@/api/types'
import * as styles from '@/styles'

type Props = {
  contents: (Content & MicroCMSContentId & MicroCMSDate)[]
}

const List: React.FC<Props> = ({ contents }) => {
  return (
    <VStack spacing={6}>
      {contents.map((item) => (
        <Link key={item.id} href={`/blog/${item.id}`} passHref>
          <a css={styles.blog.listLink}>
            <Stack columnGap={6} direction={{ base: 'column', sm: 'row' }}>
              <Box w={{ base: '100%', sm: '35%' }}>
                <Image objectFit="cover" src={item.eyecatch.url} alt="" />
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                  fontWeight="bold"
                  mb={0.5}
                >
                  {item.title}
                </Text>
                <Text mb={3} fontSize={{ base: '14px', md: '16px' }}>
                  <Icon as={AiOutlineFieldTime} verticalAlign="middle" mr={1} />
                  {formatDate(item.publishedAt)}
                </Text>
                <Tag
                  size="sm"
                  variant="outline"
                  colorScheme="teal"
                  rounded="3px"
                >
                  <TagLabel>{item.category.name}</TagLabel>
                </Tag>
              </Box>
            </Stack>
          </a>
        </Link>
      ))}
    </VStack>
  )
}

export default List
