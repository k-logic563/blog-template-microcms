import React from 'react'
import { StackDivider, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { CategoryContent } from '@/api/types'
import * as styles from '@/styles'

type Props = {
  categories: CategoryContent['contents']
}

export const Category: React.FC<Props> = ({ categories }) => {
  return (
    <VStack
      spacing={0}
      px={2}
      align="start"
      divider={<StackDivider borderColor="gray.200" />}
    >
      {categories.map((x) => (
        <Link key={x.id} href={`/blog/category/${x.id}/1`} passHref>
          <Text as="a" w="100%" py={2} css={styles.sidebar.link}>
            {x.name}
          </Text>
        </Link>
      ))}
    </VStack>
  )
}
