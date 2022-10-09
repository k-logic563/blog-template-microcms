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
      <h1 className="mb-[0.6em] tracking-[0.01em] text-center text-[24px] md:text-[32px] font-black">
        {title}
      </h1>
      <p className="text-center mb-[2.4em]">{description}</p>
      <div className="text-center">
        <Link href="/">
          <a className="transition-all duration-150 bg-teal-500 text-white rounded inline-block font-bold py-[.5em] px-[1em] hover:bg-teal-600">
            トップページに戻る
          </a>
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
