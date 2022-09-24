import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import { NextSeo } from 'next-seo'
import cheerio from 'cheerio'
import { ParsedUrlQuery } from 'querystring'
import { Link as Scroll } from 'react-scroll'
import Image from 'next/image'

import { BlogLayout } from '@/components/Layout'

import { microClient } from '@/lib/axios'
import { codeHighlight, generateToc, formatDate } from '@/utils'
import { useClient } from '@/hooks/useClient'
import { BlogContent } from '@/types/type'

import 'highlight.js/styles/atom-one-dark.css'

type BlogDetailProps = InferGetStaticPropsType<typeof getStaticProps>
type Params = ParsedUrlQuery & {
  id: string
}

const isDraft = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string')

export const getStaticPaths = async () => {
  const { data } = await microClient.get<BlogContent>('blogs')
  const paths = data.contents.map((x) => `/blog/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params, previewData } = ctx
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const { data } = await microClient.get(`/blogs/${params?.id}`, {
    params: {
      draftKey,
    },
  })
  const $ = cheerio.load(data.content, null, false)

  // コードハイライト
  codeHighlight($)

  // 目次、記事データを集約
  const props = {
    data: { ...data, content: $.html() },
    toc: generateToc($),
  }

  return {
    props,
    revalidate: 60,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = ({ data, toc }) => {
  const isClient = useClient()

  return (
    <>
      <NextSeo
        title={`${data.title}`}
        description={data.description}
        openGraph={{
          title: `${data.title}`,
          description: data.description,
          url: `https://iwtttter.tech/blog/${data.id}`,
        }}
        twitter={{
          site: `https://iwtttter.tech/blog/${data.id}`,
        }}
      />
      <h1 className="text-[24px] lg:text-[32px] mb-2 font-bold">
        {data.title}
      </h1>
      <p className="mb-8 text-gray-600 font-roboto">
        {formatDate(data.publishedAt)}
      </p>
      <Image
        className="rounded-t-lg"
        src={data.eyecatch.url}
        alt=""
        width={data.eyecatch.width}
        height={data.eyecatch.height}
      />
      <div className="bg-white rounded-b-lg px-6 md:px-10 py-12">
        {isClient && toc?.length !== 0 && (
          <div className="bg-gray-100 px-4 py-6 mb-10 rounded">
            <p className="lg:text-[20px] text-black font-medium mb-3">目次</p>
            <ul className="toc-list">
              {toc.map((x) => (
                <li className={x.name} key={x.id}>
                  <Scroll to={x.id} smooth offset={-100}>
                    {x.text}
                  </Scroll>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="blog-content">
          {isClient && (
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </div>
      </div>
    </>
  )
}

export default BlogId

BlogId.getLayout = (page) => <BlogLayout>{page}</BlogLayout>
