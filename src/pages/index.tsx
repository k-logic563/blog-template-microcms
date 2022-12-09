import Link from 'next/link'
import type { InferGetStaticPropsType, NextPageWithLayout } from 'next'

import { List } from '@/components/List'
import { PopularList } from '@/feature/home/PopularList'
import { microClient } from '@/lib/axios'
import { MainLayout } from '@/components/Layout'

import { BlogContent, CategoryContent } from '@/types/type'

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const { data: blogs } = await microClient.get<BlogContent>('blogs', {
    params: { limit: 6, offset: 0 },
  })
  const { data: popularBlogs } = await microClient.get<BlogContent>('blogs', {
    params: { limit: 5, orders: '-good_count' },
  })
  const { data: categories } = await microClient.get<CategoryContent>(
    'categories'
  )

  return {
    props: {
      blogs,
      popularBlogs,
      categories,
    },
    revalidate: 10,
  }
}

const HomePage: NextPageWithLayout<HomeProps> = ({
  blogs,
  popularBlogs,
  categories,
}) => {
  return (
    <div className="grid gap-y-20">
      {categories.contents.length !== 0 ? (
        <section>
          <h2 className="section-title">新着記事</h2>
          <List<HomeProps['blogs']['contents']> contents={blogs.contents} />
          <div className="mt-8 text-center">
            <Link href="/blog">
              <a className="inline-block rounded bg-teal-500 py-[.5em] px-[1em] font-bold text-white transition-all duration-150 hover:bg-teal-600">
                一覧を見る
              </a>
            </Link>
          </div>
        </section>
      ) : (
        <p>記事がありません。</p>
      )}
      {popularBlogs.contents.length !== 0 ? (
        <section>
          <h2 className="section-title">人気の記事</h2>
          <PopularList<HomeProps['blogs']['contents']>
            contents={popularBlogs.contents}
          />
        </section>
      ) : (
        <p>記事がありません。</p>
      )}
      <section>
        <h2 className="section-title">カテゴリー</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {categories.contents.map((x) => (
            <Link href={`/blog/category/${x.id}`} key={x.id} passHref>
              <a
                className="relative grid h-[140px] place-items-center overflow-hidden rounded-lg after:absolute after:inset-0 after:bg-black/40 after:transition-all after:duration-150 after:content-[''] hover:after:bg-black/60 sm:h-[200px]"
                style={{ backgroundImage: `url(${x.thumbnail.url})` }}
              >
                <p className="absolute z-10 text-[20px] font-bold text-white">
                  {x.name}
                </p>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>
