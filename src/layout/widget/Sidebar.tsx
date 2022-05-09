import React, { memo } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

import { Category } from '@/components/organisms/sidebar/Category'
import { Tag } from '@/components/organisms/sidebar/Tag'
import { Bio } from '@/components/organisms/sidebar/Bio'

import { CategoryContent, TagContent } from '@/api/types'

type Props = {
  categories: CategoryContent['contents']
  tags: TagContent['contents']
}

export const Sidebar: React.FC<Props> = ({ categories, tags }) => {
  return (
    <VStack gap={6}>
      <Box w="100%">
        <Text
          mb={4}
          fontSize={['base', 'lg']}
          fontWeight="bold"
          p={2}
          borderBottomWidth="2px"
          borderColor="teal.500"
        >
          ブログのお人
        </Text>
        <Bio />
      </Box>
      <Box w="100%">
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
        {categories.length !== 0 ? (
          <Category categories={categories} />
        ) : (
          <p>loading categories...</p>
        )}
      </Box>
      <Box w="100%">
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
        {tags.length !== 0 ? <Tag tags={tags} /> : <p>loading tags...</p>}
      </Box>
    </VStack>
  )
}

export default memo(Sidebar)
