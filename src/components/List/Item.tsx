import Link from 'next/link'
import React from 'react'

import { Content } from '@/types/microcms'
import { formatDate } from '@/utils'

type Props = {
  item: Content
}

export const Item = ({ item }: Props) => {
  return (
    <Link
      className="flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(49,49,49,0.3)]"
      href={`/blog/${item.id}`}
    >
      <figure>
        <img
          className="h-[160px] w-full object-cover md:h-[180px]"
          src={item.eyecatch.url}
          alt=""
        />
      </figure>
      <div className="flex h-full flex-col p-4">
        <div className="mb-3">
          <span className="inline-block rounded-full bg-teal-500 px-[0.8em] py-[0.3em] text-[12px] font-bold text-white">
            {item.category.name}
          </span>
        </div>
        <p className="mb-3 grow font-bold md:text-[18px]">{item.title}</p>
        <p className="mt-auto text-right text-[14px] font-medium text-gray-400">
          {formatDate(item.publishedAt)}
        </p>
      </div>
    </Link>
  )
}
