import React from 'react'
import { Box, Text, SimpleGrid } from '@chakra-ui/react'

import { Category } from './Category'
import { Tag } from './Tag'
import { Sns } from './Sns'

import { CategoryProps, TagProps } from '@/components/Layout/MainLayout'

type Props = {
  categories: CategoryProps
  tags: TagProps
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
        {categories.length !== 0 ? <Category categories={categories} /> : <p>loading</p>}
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
        {tags.length !== 0 ? <Tag tags={tags} /> : <p>loading</p>}
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

export default Sidebar
