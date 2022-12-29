import React, { memo } from 'react'
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
            <AiOutlineSearch className="text-[20px] md:text-[24px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
