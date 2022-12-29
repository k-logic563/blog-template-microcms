import type { NextPageWithLayout, NextPageContext } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { MainLayout } from '@/components/Layout'

interface Props {
  title: string
  description: string
}

const ErrorPage: NextPageWithLayout<Props> = ({ title, description }) => {
  return (
    <>
      <NextSeo title={title} noindex />
      <h1 className="mb-[0.6em] text-center text-[24px] font-bold md:text-[32px]">
        {title}
      </h1>
      <p className="mb-[2.4em] text-center">{description}</p>
      <div className="text-center">
        <Link
          className="inline-block rounded bg-teal-500 py-[.5em] px-[1em] font-bold text-white transition-all duration-150 hover:bg-teal-600"
          href="/"
        >
          トップページに戻る
        </Link>
      </div>
    </>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const props = {
    title: 'Unknown Error',
    description: '不明なエラーが発生しました。',
  }
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404

  if (statusCode === 404) {
    props.title = '404 Not Found'
    props.description = '入力したページが発見できませんでした。'
  }
  if (statusCode === 500) {
    props.title = '500 Internal Server Error'
    props.description = 'サーバーエラーによりページが表示できませんでした。'
  }

  return props
}

export default ErrorPage

ErrorPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
