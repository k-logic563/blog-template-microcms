import React, { memo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Flex, Text, Container, Icon, Button } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

import pkg from '~/package.json'

type Props = {
  onOpen: () => void
}

const Header: React.FC<Props> = ({ onOpen }) => {
  const { pathname } = useRouter()
  const isTopPage = pathname === '/'

  return (
    <Box
      bg="teal.500"
      h={{
        base: '52px',
        md: '72px',
      }}
      display="grid"
      placeItems="center"
      position="fixed"
      top={0}
      zIndex={1000}
      width="100%"
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          {isTopPage ? (
            <Text
              as="h1"
              color="white"
              fontSize={['lg', 'xl', '4xl']}
              fontWeight="bold"
            >
              {pkg.name}
            </Text>
          ) : (
            <Text
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
