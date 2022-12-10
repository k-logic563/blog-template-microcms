import React, { memo } from 'react'
import { Icon } from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'

import { Logo } from './Logo'

type Props = {
  onOpen: () => void
}

const Header: React.FC<Props> = ({ onOpen }) => {
  return (
    <div className="bg-white">
      <div className="container">
        <div className="flex items-center justify-between pt-6 pb-4">
          <Logo />
          <button type="button" className="ml-[20px]" onClick={onOpen}>
            <Icon className="text-[20px] md:text-[24px]" as={AiOutlineSearch} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
