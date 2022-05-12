import React from 'react'
import Link from 'next/link'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { Box, Image, Stack, VStack, Text, Icon, Flex } from '@chakra-ui/react'
import { AiOutlineFieldTime, AiOutlineTag } from 'react-icons/ai'

import { formatDate } from '@/utils/dateUtils'
import { Content } from '@/api/types'
import * as styles from '@/styles'

type Props = {
  contents: (Content & MicroCMSContentId & MicroCMSDate)[]
}

const List: React.FC<Props> = ({ contents }) => {
  return (
    <VStack spacing={6}>
      {contents.map((item) => (
        <Link key={item.id} href={`/blog/${item.id}`} passHref>
          <a css={styles.blog.listLink}>
            <Stack columnGap={6} direction={{ base: 'column', sm: 'row' }}>
              <Box
                position="relative"
                w={{ base: '100%', sm: '40%' }}
                rounded="5px"
                overflow="hidden"
              >
                <Image objectFit="cover" src={item.eyecatch.url} alt="" />
                <Text
                  position="absolute"
                  top={0}
                  left={0}
                  py={1}
                  px={2}
                  fontSize={{ base: '12px' }}
                  bg="whiteAlpha.700"
                  borderBottomRightRadius="5px"
                >
                  {item.category.name}
                </Text>
              </Box>
              <Flex direction="column" py={{ md: 2 }} flex={1}>
                <Box>
                  <Text
                    fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                    fontWeight="bold"
                    mb={2}
                  >
                    {item.title}
                  </Text>
                  <Flex gap={2}>
                    <Box>
                      <Icon verticalAlign="middle" mr={1} as={AiOutlineTag} />
                      {item.tag.map((x) => (
                        <Text display="inline-block" key={x.id}>
                          {x.name}
                        </Text>
                      ))}
                    </Box>
                  </Flex>
                </Box>
                <Text
                  mt="auto"
                  textAlign="right"
                  fontSize={{ base: '14px', md: '16px' }}
                  color="gray.500"
                >
                  <Icon as={AiOutlineFieldTime} verticalAlign="middle" mr={1} />
                  {formatDate(item.publishedAt)}
                </Text>
              </Flex>
            </Stack>
          </a>
        </Link>
      ))}
    </VStack>
  )
}

export default List
