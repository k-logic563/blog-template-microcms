import { useState } from 'react'
import axios from 'axios'
import {
  InferGetStaticPropsType,
  NextPageWithLayout,
  GetStaticPropsContext,
} from 'next'
import { Button } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import cheerio from 'cheerio'
import { ParsedUrlQuery } from 'querystring'

import { BlogLayout } from '@/components/Layout'

import { client } from '@/lib/microcms'
import { codeHighlight, formatDate } from '@/utils'
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
  const data = await client.get<BlogContent>({
    endpoint: 'blogs',
  })
  const paths = data.contents.map((x) => `/blog/${x.id}`)

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (ctx: GetStaticPropsContext<Params>) => {
  const { params, previewData } = ctx
  const draftKey = isDraft(previewData) ? previewData.draftKey : ''
  const data = await client.get({
    endpoint: `blogs/${params?.id}`,
    queries: {
      draftKey,
    },
  })
  const $ = cheerio.load(data.content, null, false)

  // コードハイライト
  codeHighlight($)

  // 目次、記事データを集約
  const props = {
    data: { ...data, content: $.html() },
  }

  return {
    props,
    revalidate: 60,
  }
}

const BlogId: NextPageWithLayout<BlogDetailProps> = ({ data }) => {
  const isClient = useClient()
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [goodCount, setGoodCount] = useState(data?.good_count ?? 0)

  const clickGoodButton = async () => {
    setIsLoading(true)

    const good_count = isActive ? goodCount - 1 : goodCount + 1
    try {
      await axios.post(`/api/blog/${data?.id}`, {
        good_count,
      })
      setGoodCount(good_count)
      setIsActive(!isActive)
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false)
  }

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
      <div className="px-[16px] text-center sm:px-0">
        <h1 className="mb-2 text-[24px] font-bold leading-normal lg:text-[32px]">
          {data.title}
        </h1>
        {data.publishedAt && (
          <p className="mb-4 text-sm tracking-wider text-gray-600">
            {formatDate(data.publishedAt)}
          </p>
        )}
        <div className="mb-8">
          <Button
            isLoading={isLoading}
            colorScheme="red"
            variant={isActive ? 'solid' : 'outline'}
            size="sm"
            onClick={clickGoodButton}
          >
            <span className="mr-1">{goodCount}</span>
            {isActive ? 'Thank You!' : 'Good!'}
          </Button>
        </div>
      </div>
      <img
        className="sm:rounded-t-lg"
        src={data.eyecatch.url}
        alt=""
        width={data.eyecatch.width}
        height={data.eyecatch.height}
      />
      <div className="bg-white px-[16px] py-12 sm:rounded-b-lg md:px-10">
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
