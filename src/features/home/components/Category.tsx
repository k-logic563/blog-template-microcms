import Link from 'next/link'

import { CategoryContent } from '@/types/microcms'

type Props = {
  contents: CategoryContent['contents']
}

export const Category = ({ contents }: Props) => {
  return contents.length > 0 ? (
    <div className="grid gap-[20px] xs:grid-cols-2 md:gap-x-[24px] md:gap-y-[32px] lg:grid-cols-3">
      {contents.map((cat) => (
        <Link
          href={`/blog/category/${cat.id}`}
          className="relative grid h-[140px] place-items-center overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-black/40 after:transition-all after:duration-150 after:content-[''] hover:after:bg-black/60 sm:h-[200px]"
          style={{ backgroundImage: `url(${cat.thumbnail.url})` }}
          key={cat.id}
        >
          <p className="absolute z-10 text-[20px] font-bold text-white">
            {cat.name}
          </p>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-center">カテゴリがありません</p>
  )
}
