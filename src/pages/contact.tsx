import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'

import { MainLayout } from '@/components/Layout'

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="お問い合わせ"
        openGraph={{
          title: 'お問い合わせ',
          description: 'iwtttter-blogサイトのお問い合わせページです。',
          url: 'https://iwtttter.tech/contact',
        }}
      />
      <h1 className="font-bold text-[24px] md:text-[28px] mb-6">
        お問い合わせ
      </h1>
      <p className="leading-loose">
        現在、フォーム停止しております。
        <br />
        御用の方はSNS TwitterDMよりご連絡していただけると幸いです。
      </p>
    </>
  )
}

export default ContactPage

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
