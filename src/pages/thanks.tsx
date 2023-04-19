import { GetServerSideProps } from 'next'
import type { NextPageWithLayout } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { MainLayout } from '@/components/Layout'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isRefererContact = ctx.req.headers.referer?.endsWith('/contact')
  if (!isRefererContact) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    }
  }
  return {
    props: {},
  }
}

const Thanks: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="お問い合わせ完了"
        description="お問い合わせ完了"
        noindex
      />
      <div>
        <h1 className="mb-6 text-center text-[24px] font-bold md:text-[28px]">
          お問い合わせ完了しました
        </h1>
        <p className="mb-6 text-center leading-loose">
          お問い合わせいただき、誠にありがとうございます。
          <br />
          お返事まで少々お待ちくださいませ。
        </p>
        <div className="text-center">
          <Link
            className="inline-block rounded bg-teal-500 py-[.5em] px-[1em] font-bold text-white transition-all duration-150 hover:bg-teal-600"
            href="/"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </>
  )
}

export default Thanks

Thanks.getLayout = (page) => <MainLayout>{page}</MainLayout>
