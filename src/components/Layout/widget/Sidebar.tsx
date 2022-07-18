import React, { memo } from 'react'
import { Box, Text, SimpleGrid } from '@chakra-ui/react'

import { Category } from './Category'
import { Tag } from './Tag'
import { Sns } from './Sns'

import { Toc, CategoryContent, TagContent } from '@/api/types'

type Props = {
  toc?: Toc[]
  categories: CategoryContent['contents'] | [] | undefined
  tags: TagContent['contents'] | [] | undefined
}

export const Sidebar: React.FC<Props> = ({ categories, tags }) => {
  return (
    <SimpleGrid gap={6}>
      <Box>
        <Text
          mb={4}
          fontSize={['base', 'lg']}
          fontWeight="bold"
          p={2}
          borderBottomWidth="2px"
          borderColor="teal.500"
        >
          カテゴリー
        </Text>
        {categories ? (
          categories.length !== 0 ? (
            <Category categories={categories} />
          ) : (
            <p>カテゴリーがありません</p>
          )
        ) : (
          <Text>Now Loading...</Text>
        )}
      </Box>
      <Box>
        <Text
          mb={4}
          fontSize={['base', 'lg']}
          fontWeight="bold"
          p={2}
          borderBottomWidth="2px"
          borderColor="teal.500"
        >
          タグ
        </Text>
        {tags ? (
          tags.length !== 0 ? (
            <Tag tags={tags} />
          ) : (
            <p>タグがありません</p>
          )
        ) : (
          <Text>Now Loading...</Text>
        )}
      </Box>
      <Box>
        <Text
          mb={4}
          fontSize={['base', 'lg']}
          fontWeight="bold"
          p={2}
          borderBottomWidth="2px"
          borderColor="teal.500"
        >
          SNS
        </Text>
        <Sns />
      </Box>
    </SimpleGrid>
  )
}

export default memo(Sidebar)
