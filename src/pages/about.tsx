import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'

import { MainLayout } from '@/components/Layout'

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="このサイトについて"
        openGraph={{
          title: 'このサイトについて',
          description: 'iwtttter-blogサイトについての紹介ページです。',
          url: 'https://iwtttter.tech/about',
        }}
      />
      <div>
        <h1 className="font-bold text-[24px] md:text-[28px] mb-6">
          このサイトについて
        </h1>
        <div className="leading-[1.8]">
          <p className="mb-4">
            このサイトは日頃の業務から個人開発まで、気づきや勉強になったことをまとめるテックブログサイトになります。
            <br />
            「あれ？前も同じ問題に出会った気がするなぁ。」をなるべく減らすために、自分がつまづいた部分も積極的に記事にまとめていきます。
          </p>
          <p className="mb-8">
            なるべく思った時に更新するようにしていますが、怠け癖があるため、更新頻度にばらつきがあります。人間だもの。
          </p>
          <div className="flex items-center gap-x-4">
            <Image
              width={65}
              height={65}
              objectFit="cover"
              className="rounded-full"
              src="/assets/images/iwt.jpg"
              alt="いわを"
            />
            <p>いわを</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
