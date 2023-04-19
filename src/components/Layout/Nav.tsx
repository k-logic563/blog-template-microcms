import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { menuItems } from '@/constants/pages'

export const Nav: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="container">
        <div className="flex gap-x-[1rem]">
          {menuItems.map((item, idx) => (
            <Link
              className={`relative py-[1em] font-bold text-gray-500 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-black after:opacity-0 hover:text-black hover:after:opacity-100 md:text-[18px] ${
                pathname === item.link
                  ? 'pointer-events-none text-black after:opacity-100'
                  : ''
              }`}
              key={idx}
              href={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
