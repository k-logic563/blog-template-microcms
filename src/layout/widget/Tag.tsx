import React from 'react'
import { StackDivider, VStack } from '@chakra-ui/react'
import Link from 'next/link'

import * as styles from '@/styles'
import { TagContent } from '@/api/types'

type Props = {
  tags: TagContent['contents']
}

export const Tag: React.FC<Props> = ({ tags }) => {
  return (
    <VStack
      spacing={0}
      align="start"
      divider={<StackDivider borderColor="gray.200" />}
    >
      {tags.map((x) => (
        <Link key={x.id} href={`/blog/tag/${x.id}/1`} passHref>
          <a css={styles.sidebar.link}>{x.name}</a>
        </Link>
      ))}
    </VStack>
  )
}
