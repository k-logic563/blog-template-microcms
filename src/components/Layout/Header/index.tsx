import React, { memo } from 'react'
import Link from 'next/link'
import { Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai'

import { Logo } from './Logo'

import { menuItems } from '@/constants/pages'

type Props = {
  onOpen: () => void
}

const Header: React.FC<Props> = ({ onOpen }) => {
  return (
    <div className="bg-white h-[52px] md:h-[72px] grid items-center fixed top-0 z-[1000] w-full">
      <div className="container">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center">
            <div className="gap-x-[12px] hidden md:flex">
              {menuItems.map((item, idx) => (
                <Link key={idx} href={item.link} passHref>
                  <a className="text-[14px] md:text-[18px] font-roboto">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <div className="md:hidden">
              <Menu>
                <MenuButton>
                  <Icon
                    className="text-[20px] md:text-[24px]"
                    as={AiOutlineMenu}
                  />
                </MenuButton>
                <MenuList>
                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.link} passHref>
                      <MenuItem as="a" className="font-roboto">
                        {item.name}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Menu>
            </div>
            <button type="button" className="ml-[20px]" onClick={onOpen}>
              <Icon
                className="text-[20px] md:text-[24px]"
                as={AiOutlineSearch}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
