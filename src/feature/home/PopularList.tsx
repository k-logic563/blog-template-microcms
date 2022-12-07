import Link from 'next/link'
import { Image } from '@chakra-ui/react'
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'

import { formatDate } from '@/utils'
import { Content } from '@/types/type'

type Props<T> = {
  contents: T
}

type ContentsProps = (Content & MicroCMSContentId & MicroCMSDate)[]

const rankTextClass = [
  'bg-amber-400',
  'bg-slate-400',
  'bg-amber-900',
  'bg-teal-600',
  'bg-teal-600',
]

export const PopularList = <T extends ContentsProps>({
  contents,
}: Props<T>) => {
  return (
    <div className="flex flex-wrap justify-center gap-[24px] lg:gap-x-[32px] lg:gap-y-[32px]">
      {contents.map((item, index) => (
        <Link key={`${item.id}_${index}`} href={`/blog/${item.id}`} passHref>
          <a className="relative w-full sm:w-[calc(50%-1/2*24px)] lg:w-[calc(33.3333%-2/3*32px)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(49,49,49,0.3)]">
            <div
              className={`grid place-items-center text-xl font-bold font-roboto italic w-[45px] h-[45px] bg-white rounded-full absolute left-0 top-0 -translate-y-1/3 -translate-x-1/3 text-white ${rankTextClass[index]}`}
            >
              {index + 1}
            </div>
            <Image
              className="w-full h-[160px] md:h-[180px] object-cover rounded-tr-lg"
              src={item.eyecatch.url}
              alt=""
            />
            <div className="p-4 bg-white rounded-b-lg">
              <div className="mb-3">
                <span className="text-[12px] font-bold inline-block bg-teal-500 rounded-full text-white px-[0.8em] py-[0.3em]">
                  {item.category.name}
                </span>
              </div>
              <p className="md:text-[18px] font-bold mb-3">{item.title}</p>
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
