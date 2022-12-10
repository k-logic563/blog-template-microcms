import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'

import { MainLayout } from '@/components/Layout'

const PrivacyPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="プライバシーポリシー"
        openGraph={{
          title: 'プライバシーポリシー',
          description: 'iwtttter-blogサイトのプライバシーポリシーページです。',
          url: 'https://iwtttter.tech/privacy',
        }}
      />
      <div className="mb-12">
        <h1 className="mb-6 text-[24px] font-bold md:text-[28px]">
          プライバシーポリシー
        </h1>
        <p className="leading-loose">
          iwtttter-blog(以下「当ブログ」)のプライバシーポリシー・免責事項を次の通り記載します。
        </p>
      </div>
      <div className="mb-10">
        <h2 className="mb-[0.8em] text-[18px] font-bold md:text-[22px]">
          個人情報の利用目的について
        </h2>
        <p className="leading-loose">
          当ブログでは、お問い合わせの際に氏名・メールアドレス等の個人情報を入力いただく場合があります。
          <br />
          取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
        </p>
      </div>
      <div className="mb-10">
        <h2 className="mb-[0.8em] text-[18px] font-bold md:text-[22px]">
          アクセス解析ツールについて
        </h2>
        <p className="leading-loose">
          当ブログでは、Umamiによりアクセス情報を解析しています。
          <br />
          アクセス情報の解析にはCookieを使用しておりません。
          <a
            className="text-blue-500"
            href="https://www.ppc.go.jp/enforcement/infoprovision/laws/GDPR/"
            target="_blank"
            rel="noreferrer"
          >
            GDPR
          </a>
          に準拠しています。
        </p>
      </div>
      <div className="mb-10">
        <h2 className="mb-[0.8em] text-[18px] font-bold md:text-[22px]">
          免責事項
        </h2>
        <p className="leading-loose">
          当ブログは、掲載内容によって生じた損害に対する一切の責任を負いません。
          <br />
          各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではないことをご了承ください。
          <br />
          また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。
        </p>
      </div>
      <div className="mb-10">
        <h2 className="mb-[0.8em] text-[18px] font-bold md:text-[22px]">
          著作権について
        </h2>
        <p className="leading-loose">
          当ブログに掲載されている文章・画像の著作権は、運営者に帰属しています。
          <br />
          法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
        </p>
      </div>
      <div className="mb-12">
        <h2 className="mb-[0.8em] text-[18px] font-bold md:text-[22px]">
          プライバシーポリシーの変更
        </h2>
        <p className="leading-loose">
          当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。
        </p>
      </div>
      <p className="leading-loose">
        制定日:2022年8月3日
        <br />
        iwtttter-blog
      </p>
    </>
  )
}

export default PrivacyPage

PrivacyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
