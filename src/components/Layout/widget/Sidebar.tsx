import { Box, Text, SimpleGrid } from '@chakra-ui/react'

import { Category } from './Category'
import { Tag } from './Tag'
import { Sns } from './Sns'

export const Sidebar = () => {
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
        <Category />
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
        <Tag />
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
