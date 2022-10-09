import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'

import { Heading1 } from '@/components/Heading/Heading1'
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
      <div className="mb-10">
        <Heading1 title="お問い合わせ" subTitle="Contact" />
      </div>
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
