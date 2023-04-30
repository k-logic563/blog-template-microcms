import type { InferGetStaticPropsType, NextPageWithLayout } from 'next'

import { MainLayout } from '@/components/Layout'
import { List } from '@/components/List'
import { Category, PopularList } from '@/features/home'
import { client } from '@/lib/microcms'
import { BlogContent, CategoryContent } from '@/types/microcms'

export type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const blogs = await client.get<BlogContent>({
    endpoint: 'blogs',
    queries: {
      limit: 6,
      offset: 0,
    },
  })
  const popularBlogs = await client.get<BlogContent>({
    endpoint: 'blogs',
    queries: {
      limit: 5,
      orders: '-good_count',
    },
  })
  const categories = await client.get<CategoryContent>({
    endpoint: 'categories',
  })

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
      <section>
        <h2 className="section-title">新着記事</h2>
        <List contents={blogs.contents} />
      </section>
      <section>
        <h2 className="section-title">人気の記事</h2>
        <PopularList<HomeProps['blogs']['contents']>
          contents={popularBlogs.contents}
        />
      </section>
      <section>
        <h2 className="section-title">カテゴリー</h2>
        <Category contents={categories.contents} />
      </section>
    </div>
  )
}

export default HomePage

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>
