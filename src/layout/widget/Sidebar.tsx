import React, { memo, useEffect, useState } from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

import { Category } from '@/layout/widget/Category'
import { Tag } from '@/layout/widget/Tag'
import { CategoryContent, TagContent } from '@/api/types'
import axios from 'axios'

const CATEGORY_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`
const TAG_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`

export const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<CategoryContent['contents']>([])
  const [tags, setTags] = useState<TagContent['contents']>([])

  useEffect(() => {
    const promise1 = axios.get<CategoryContent>(CATEGORY_URL)
    const promise2 = axios.get<TagContent>(TAG_URL)
    Promise.all([promise1, promise2]).then((responses) => {
      setCategories(responses[0].data.contents)
      setTags(responses[1].data.contents)
    })
  }, [])

  return (
    <VStack gap={6}>
      <Box w="100%">
        <Text
          mb={4}
          fontSize={['base', 'lg']}
          fontWeight="bold"
          bg="gray.200"
          p={2}
          rounded="base"
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
          bg="gray.200"
          p={2}
          rounded="base"
        >
          タグ
        </Text>
        {tags.length !== 0 ? <Tag tags={tags} /> : <p>loading tags...</p>}
      </Box>
    </VStack>
  )
}

export default memo(Sidebar)
