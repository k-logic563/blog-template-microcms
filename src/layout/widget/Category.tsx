import React from 'react'
import { StackDivider, VStack } from '@chakra-ui/react'
import Link from 'next/link'

import { CategoryContent } from '@/api/types'

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
          <a>{x.name}</a>
        </Link>
      ))}
    </VStack>
  )
}
