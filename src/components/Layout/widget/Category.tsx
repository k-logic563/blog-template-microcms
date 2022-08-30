import { StackDivider, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { TagContent } from '@/types/type'

import { useFetcher } from '@/hooks/useFetcher'
import * as styles from '@/styles'

export const Category = () => {
  const { data, error } = useFetcher<TagContent>('category')

  if (error) throw new Error(error)

  return (
    <VStack
      spacing={0}
      px={2}
      align="start"
      divider={<StackDivider borderColor="gray.200" />}
    >
      {data?.contents.map((x) => (
        <Link key={x.id} href={`/blog/category/${x.id}/1`} passHref>
          <Text as="a" w="100%" py={2} css={styles.sidebar.link}>
            {x.name}
          </Text>
        </Link>
      ))}
    </VStack>
  )
}
