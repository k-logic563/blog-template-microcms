import React, { memo } from 'react'
import { Box, Text, SimpleGrid } from '@chakra-ui/react'
import { Link as Scroll } from 'react-scroll'

import { Category } from './Category'
import { Tag } from './Tag'
import { Sns } from './Sns'

import { Toc, CategoryContent, TagContent } from '@/api/types'
import * as styles from '@/styles'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useClient } from '@/hooks/useClient'

type Props = {
  toc?: Toc[]
  categories: CategoryContent['contents'] | [] | undefined
  tags: TagContent['contents'] | [] | undefined
}

export const Sidebar: React.FC<Props> = ({ toc, categories, tags }) => {
  const isMobile = useBreakpoint()
  const isClient = useClient()

  return (
    <SimpleGrid gap={6}>
      {isClient && !isMobile && toc && (
        <Box px={4} py={6} bg="gray.50" rounded="5px">
          <Text
            fontSize={{ base: '16px', lg: '20px' }}
            fontWeight="bold"
            mb={3}
          >
            目次
          </Text>
          <ol css={styles.blog.tocList}>
            {toc.map((x) => (
              <li className={x.name} key={x.id}>
                <Scroll to={x.id} smooth offset={-100}>
                  {x.text}
                </Scroll>
              </li>
            ))}
          </ol>
        </Box>
      )}
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
        {categories ? (
          categories.length !== 0 ? (
            <Category categories={categories} />
          ) : (
            <p>カテゴリーがありません</p>
          )
        ) : (
          <Text>Now Loading...</Text>
        )}
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
        {tags ? (
          tags.length !== 0 ? (
            <Tag tags={tags} />
          ) : (
            <p>タグがありません</p>
          )
        ) : (
          <Text>Now Loading...</Text>
        )}
      </Box>
      {!toc && (
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
      )}
    </SimpleGrid>
  )
}

export default memo(Sidebar)
