import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'

import { Title } from '@/components/Heading/Title'
import { MainLayout } from '@/components/Layout'

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="このサイトについて" description="このサイトについて" />
      <div>
        <div className="mb-10">
          <Title title="このサイトについて" subTitle="About" />
        </div>
        <div className="leading-[1.8]">
          <p className="mb-8">テストサイトになります。</p>
        </div>
      </div>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
