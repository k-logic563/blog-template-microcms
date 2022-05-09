import React from 'react'
import Link from 'next/link'
import { Flex, Icon } from '@chakra-ui/react'
import { AiOutlineTag } from 'react-icons/ai'

import { TagContent } from '@/api/types'

type Props = {
  tags: TagContent['contents']
}

export const Tag: React.FC<Props> = ({ tags }) => {
  return (
    <Flex gap={2} align="center" flexWrap="wrap" px={2}>
      {tags.map((x) => (
        <Link key={x.id} href={`/blog/tag/${x.id}/1`} passHref>
          <a>
            <Icon verticalAlign="middle" mr={1} as={AiOutlineTag} />
            {x.name}
          </a>
        </Link>
      ))}
    </Flex>
  )
}
