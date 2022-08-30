import Link from 'next/link'
import { Flex, Icon } from '@chakra-ui/react'
import { AiOutlineTag } from 'react-icons/ai'

import { useFetcher } from '@/hooks/useFetcher'
import { TagContent } from '@/types/type'

import * as styles from '@/styles'

export const Tag = () => {
  const { data, error } = useFetcher<TagContent>('tag')

  if (error) throw new Error(error)

  return (
    <Flex gap={2} align="center" flexWrap="wrap" px={2}>
      {data?.contents.map((x) => (
        <Link key={x.id} href={`/blog/tag/${x.id}/1`} passHref>
          <a css={styles.sidebar.link}>
            <Icon verticalAlign="middle" mr={1} as={AiOutlineTag} />
            {x.name}
          </a>
        </Link>
      ))}
    </Flex>
  )
}
