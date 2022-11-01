import { GetServerSideProps } from 'next'
import Link from 'next/link'
import type { NextPageWithLayout } from 'next'
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
        openGraph={{
          title: 'お問い合わせ完了',
          description: 'iwtttter-blogサイトのお問い合わせ完了ページです。',
          url: 'https://iwtttter.tech/thanks',
        }}
        noindex
      />
      <div>
        <h1 className="text-center font-bold text-[24px] md:text-[28px] mb-6">
          お問い合わせ完了しました
        </h1>
        <p className="text-center leading-loose mb-6">
          お問い合わせいただき、誠にありがとうございます。
          <br />
          お返事まで少々お待ちくださいませ。
        </p>
        <div className="text-center">
          <Link
            href="/"
            className="transition-all duration-150 bg-teal-500 text-white rounded inline-block font-bold py-[.5em] px-[1em] hover:bg-teal-600"
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
