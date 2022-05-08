import React, { memo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Icon,
  Button,
} from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

import pkg from '~/package.json'

type Props = {
  onOpen: () => void
}

const Header: React.FC<Props> = ({ onOpen }) => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <Box bg="teal.500" py={4}>
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          {isTopPage ? (
            <Heading as="h1" color="white" fontSize={['lg', 'xl', '4xl']}>
              {pkg.name}
            </Heading>
          ) : (
            <Text
              lineHeight={1.2}
              fontSize={['lg', 'xl', '4xl']}
              fontWeight="bold"
              color="white"
            >
              <Link href="/" passHref>
                <a>{pkg.name}</a>
              </Link>
            </Text>
          )}
          <Button
            variant="unstyled"
            onClick={onOpen}
            display="flex"
            alignContent="center"
          >
            <Icon
              as={AiOutlineSearch}
              fontSize={{ base: '20px', md: '24px' }}
              color="white"
            />
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Header)
