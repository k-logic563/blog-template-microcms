import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk'
import Link from 'next/link'

import { Content } from '@/types/microcms'
import { formatDate } from '@/utils'

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
  return contents.length > 0 ? (
    <div className="flex flex-wrap justify-center gap-[24px] lg:gap-[32px]">
      {contents.map((item, index) => (
        <Link
          className="relative w-full transition-all duration-150 hover:opacity-60 sm:w-[calc(50%-1/2*24px)] lg:w-[calc(33.3333%-2/3*32px)]"
          key={`${item.id}_${index}`}
          href={`/blog/${item.id}`}
        >
          <div
            className={`absolute left-0 top-0 grid h-[45px] w-[45px] -translate-y-1/4 -translate-x-1/4 place-items-center rounded-full bg-white text-xl font-bold italic text-white ${rankTextClass[index]}`}
          >
            {index + 1}
          </div>
          <figure className="mb-4">
            <img
              className="h-[160px] w-full rounded-lg object-cover md:h-[180px]"
              src={item.eyecatch.url}
              alt=""
            />
          </figure>
          <p className="mb-[0.1em] text-[14px] font-medium text-gray-400">
            {formatDate(item.publishedAt)}
          </p>
          <p className="mb-3 grow font-bold md:text-[18px]">{item.title}</p>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center">記事がありません</p>
  )
}
