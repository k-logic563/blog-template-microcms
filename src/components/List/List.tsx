import Link from 'next/link'
import { Image } from '@chakra-ui/react'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

import { formatDate } from '@/utils'
import { Content } from '@/types/type'

type Props<T> = {
  contents: T
}

type ContentsProps = (Content & MicroCMSContentId & MicroCMSDate)[]

export const List = <T extends ContentsProps>({ contents }: Props<T>) => {
  return (
    <div className="grid gap-[20px] xs:grid-cols-2 md:gap-x-[24px] md:gap-y-[32px] lg:grid-cols-3">
      {contents.map((item, index) => (
        <Link key={`${item.id}_${index}`} href={`/blog/${item.id}`} passHref>
          <a className="flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(49,49,49,0.3)]">
            <figure>
              <Image
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
          </a>
        </Link>
      ))}
    </div>
  )
}
