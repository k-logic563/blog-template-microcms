import React from 'react'
import Link from 'next/link'
import { Flex } from '@chakra-ui/react'

import * as styles from '@/styles'
import { perPage } from '@/constants/pagination'
import { range } from '@/utils/range'

type Props = {
  totalCount: number
  path: string
  pageId: number
}

export const Pagination: React.FC<Props> = ({ totalCount, path, pageId }) => {
  return (
    <Flex justifyContent="center" as="nav" gap={{ base: 2, sm: 4 }}>
      {range(1, Math.ceil(totalCount / perPage)).map((number, index) => (
        <Link key={index} href={`/${path}/${number}`} passHref>
          <a
            css={styles.blog.pagination}
            className={pageId === number ? 'is-active' : ''}
          >
            {number}
          </a>
        </Link>
      ))}
    </Flex>
  )
}