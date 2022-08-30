import React, { memo } from 'react'
import Link from 'next/link'
import {
  Box,
  Flex,
  Container,
  HStack,
  useColorMode,
  useMediaQuery,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link as CUILink,
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import { Logo } from './Logo'

import { menuItems } from '@/constants/pages'

type Props = {
  onOpen: () => void
}

const Header: React.FC<Props> = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isPcShow] = useMediaQuery('(min-width: 640px)')

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
          {!isPcShow && (
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
                {menuItems.map((item, idx) => (
                  <Link key={idx} href={item.link} passHref>
                    <MenuItem as="a" fontSize={{ base: '14px', sm: '16px' }}>
                      {item.name}
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          )}
          <Logo />
          <HStack spacing={6}>
            {isPcShow && (
              <HStack spacing={3}>
                {menuItems.map((item, idx) => (
                  <Link key={idx} href={item.link} passHref>
                    <CUILink
                      color="white"
                      fontSize={{ base: '14px', md: '18px' }}
                    >
                      {item.name}
                    </CUILink>
                  </Link>
                ))}
              </HStack>
            )}
            {isPcShow && (
              <Icon
                cursor="pointer"
                onClick={onOpen}
                as={AiOutlineSearch}
                fontSize={{ base: '20px', md: '24px' }}
                color="white"
              />
            )}
            <Icon
              onClick={toggleColorMode}
              fontSize={{ base: '18px', md: '20px' }}
              cursor="pointer"
              as={colorMode === 'light' ? BsFillMoonFill : BsFillSunFill}
              color="white"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default memo(Header)
