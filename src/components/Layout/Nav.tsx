import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { menuItems } from '@/constants/pages'

export const Nav: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <div className="sticky top-0 z-[1000] bg-white">
      <div className="container">
        <div className="gap-x-[1rem] flex">
          {menuItems.map((item, idx) => (
            <Link key={idx} href={item.link} passHref>
              <a
                className={`relative md:text-[18px] font-roboto font-bold py-[1em] text-gray-500 hover:after:opacity-100 hover:text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-black after:opacity-0 ${
                  pathname === item.link ? 'text-black after:opacity-100' : ''
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
