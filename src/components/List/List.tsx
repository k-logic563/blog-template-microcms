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
    <div className="grid gap-[20px] md:gap-x-[24px] md:gap-y-[32px] xs:grid-cols-2 lg:grid-cols-3">
      {contents.map((item, index) => (
        <Link key={`${item.id}_${index}`} href={`/blog/${item.id}`} passHref>
          <a className="flex flex-col transition-all duration-300 bg-white rounded-lg overflow-hidden hover:shadow-[0_0_30px_rgba(49,49,49,0.3)]">
            <figure>
              <Image
                className="w-full h-[160px] md:h-[180px] object-cover"
                src={item.eyecatch.url}
                alt=""
              />
            </figure>
            <div className="p-4 flex flex-col h-full">
              <div className="mb-3">
                <span className="text-[12px] font-bold inline-block bg-teal-500 rounded-full text-white px-[0.8em] py-[0.3em]">
                  {item.category.name}
                </span>
              </div>
              <p className="md:text-[18px] font-bold mb-3 grow">{item.title}</p>
              <p className="mt-auto text-right text-[14px] text-gray-400 font-roboto font-medium">
                {formatDate(item.publishedAt)}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
