import React from 'react'
import Link from 'next/link'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import { Box, Image, Stack, VStack, Text, Icon, Flex } from '@chakra-ui/react'
import { AiOutlineFieldTime, AiOutlineTag } from 'react-icons/ai'

import { formatDate } from '@/utils/format'
import { Content } from '@/api/types'
import * as styles from '@/styles'

type Props<T> = {
  contents: T
}

type ContentsProps = (Content & MicroCMSContentId & MicroCMSDate)[]

export const List = <T extends ContentsProps>({ contents }: Props<T>) => {
  return (
    <VStack spacing={6}>
      {contents.map((item) => (
        <Link key={item.id} href={`/blog/${item.id}`} passHref>
          <a css={styles.blog.listLink}>
            <Stack columnGap={6} direction={{ base: 'column', sm: 'row' }}>
              <Box position="relative" w={{ base: '100%', sm: '40%' }}>
                <Image
                  objectFit="cover"
                  rounded="5px"
                  src={item.eyecatch.url}
                  alt=""
                />
                <Text
                  position="absolute"
                  top={0}
                  left={0}
                  py={1}
                  px={2}
                  fontSize={{ base: '12px' }}
                  color="black"
                  bg="whiteAlpha.800"
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
                    mb={{ base: 1, sm: 2 }}
                  >
                    {item.title}
                  </Text>
                  <Flex columnGap={2} rowGap={1} wrap="wrap" mb={2}>
                    {item.tag.map((x) => (
                      <Box key={x.id} color="gray.500" fontSize="14px">
                        <Icon mr={1} verticalAlign="middle" as={AiOutlineTag} />
                        <Text display="inline-block" key={x.id}>
                          {x.name}
                        </Text>
                      </Box>
                    ))}
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
