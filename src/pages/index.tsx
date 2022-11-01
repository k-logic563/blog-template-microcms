import Link from 'next/link'
import type { InferGetStaticPropsType, NextPageWithLayout } from 'next'

import { List } from '@/components/List'
import { microClient } from '@/lib/axios'
import { MainLayout } from '@/components/Layout'

import { BlogContent, CategoryContent } from '@/types/type'

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const { data: blogs } = await microClient.get<BlogContent>('blogs', {
    params: { limit: 6, offset: 0 },
  })
  const { data: categories } = await microClient.get<CategoryContent>(
    'categories'
  )

  return {
    props: {
      blogs,
      categories,
    },
    revalidate: 10,
  }
}

const HomePage: NextPageWithLayout<HomeProps> = ({ blogs, categories }) => {
  return (
    <div className="grid gap-y-20">
      {categories.contents.length !== 0 ? (
        <div>
          <List<HomeProps['blogs']['contents']> contents={blogs.contents} />
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="transition-all duration-150 bg-teal-500 text-white rounded inline-block font-bold py-[.5em] px-[1em] hover:bg-teal-600"
            >
              一覧を見る
            </Link>
          </div>
        </div>
      ) : (
        <p>記事がありません。</p>
      )}
      <section>
        <h2 className="w-fit mx-auto relative text-[20px] md:text-[24px] font-bold mb-[2.5em] after:content-[''] after:h-[4px] after:left-0 after:bottom-0 after:bg-teal-500 after:rounded-full after:w-full after:absolute px-[1em] pb-[0.6em]">
          カテゴリー
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.contents.map((x) => (
            <Link
              href={`/blog/category/${x.id}`}
              key={x.id}
              className="h-[140px] sm:h-[200px] rounded-lg grid place-items-center relative after:content-[''] after:inset-0 after:bg-black after:bg-opacity-40 after:absolute hover:after:bg-opacity-60 after:transition-all after:duration-150 overflow-hidden"
              style={{ backgroundImage: `url(${x.thumbnail.url})` }}
            >
              <p className="font-bold text-[20px] text-white absolute z-10">
                {x.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>
