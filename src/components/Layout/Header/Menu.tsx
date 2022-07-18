import React from 'react'
import {
  HStack,
  Icon,
  Menu as CUIMenu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import Link from 'next/link'

import { menuItems } from '@/constants/pages'

type Props = {
  onOpen: () => void
}

export const Menu: React.FC<Props> = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack spacing={3}>
      <CUIMenu>
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
      </CUIMenu>
      <Icon
        cursor="pointer"
        onClick={onOpen}
        as={AiOutlineSearch}
        fontSize={{ base: '20px', md: '24px' }}
        color="white"
      />
      <Icon
        onClick={toggleColorMode}
        fontSize={{ base: '18px', md: '20px' }}
        cursor="pointer"
        as={colorMode === 'light' ? BsFillMoonFill : BsFillSunFill}
        color="white"
      />
    </HStack>
  )
}
