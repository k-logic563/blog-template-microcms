import type { NextPageWithLayout, NextPageContext } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { MainLayout } from '@/components/Layout'

interface Props {
  statusCode: number | undefined
}

const ErrorPage: NextPageWithLayout<Props> = ({ statusCode }) => {
  return (
    <>
      <NextSeo title="エラーページ" noindex />
      {statusCode && (
        <h1 className="mb-[0.6em] text-center text-[24px] font-bold md:text-[32px]">
          {statusCode}
        </h1>
      )}
      <p className="mb-[2.4em] text-center">
        {statusCode
          ? `${statusCode}エラーが発生しました`
          : 'アプリケーション側のエラーが発生しました'}
      </p>
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
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return {
    statusCode,
  }
}

export default ErrorPage

ErrorPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
