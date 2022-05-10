import React, { memo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Box,
  Flex,
  Text,
  Container,
  Icon,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai'

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
          <HStack spacing={2}>
            <Menu>
              <MenuButton>
                <Icon
                  as={AiOutlineMenu}
                  fontSize={{ base: '20px', md: '24px' }}
                  color="white"
                  verticalAlign="middle"
                />
              </MenuButton>
              <MenuList>
                <Link href="/about" passHref>
                  <MenuItem as="a" fontSize={{ base: '14px', sm: '16px' }}>
                    このサイトについて
                  </MenuItem>
                </Link>
                <Link href="/privacy" passHref>
                  <MenuItem as="a" fontSize={{ base: '14px', sm: '16px' }}>
                    プライバシーポリシー
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
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
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Header)
