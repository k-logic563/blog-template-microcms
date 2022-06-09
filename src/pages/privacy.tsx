import React from 'react'
import type { NextPageWithLayout } from 'next'
import { NextSeo } from 'next-seo'
import { Box, Text, Heading, Link } from '@chakra-ui/react'

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
      <Box mb={12}>
        <Heading as="h1" fontSize={{ base: '24px', md: '28px' }} mb={4}>
          プライバシーポリシー
        </Heading>
        <Text>
          iwtttter-blog(以下「当ブログ」)のプライバシーポリシー・免責事項を次の通り記載します。
        </Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          個人情報の利用目的について
        </Heading>
        <Text>
          当ブログでは、お問い合わせの際に氏名・メールアドレス等の個人情報を入力いただく場合があります。
          <br />
          取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。
        </Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          Cookieの使用について
        </Heading>
        <Text>
          当ブログでは、アクセス解析のためにCookieを使用しています。
          <br />
          Cookieによりブラウザを識別していますが、特定の個人の識別はできない状態で匿名性が保たれています。
          <br />
          Cookieの使用を望まない場合、ブラウザからCookieを無効に設定できます。
        </Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          アクセス解析ツールについて
        </Heading>
        <Text>
          当ブログでは、Googleアナリティクスによりアクセス情報を解析しています。
          <br />
          アクセス情報の解析にはCookieを使用しています。また、アクセス情報の収集はCookieを無効にすることで拒否できます。
          <br />
          Google社のデータ収集・処理の仕組みについては、
          <Link
            color="blue.600"
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
          >
            こちら
          </Link>
          をご覧ください。
        </Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          免責事項
        </Heading>
        <Text>
          当ブログは、掲載内容によって生じた損害に対する一切の責任を負いません。
          <br />
          各コンテンツでは、できる限り正確な情報提供を心がけておりますが、正確性や安全性を保証するものではないことをご了承ください。
          <br />
          また、リンク先の他サイトで提供される情報・サービスについても、責任を負いかねますのでご了承ください。
        </Text>
      </Box>
      <Box mb={8}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          著作権について
        </Heading>
        <Text>
          当ブログに掲載されている文章・画像の著作権は、運営者に帰属しています。
          <br />
          法的に認められている引用の範囲を超えて、無断で転載することを禁止します。
        </Text>
      </Box>
      <Box mb={12}>
        <Heading as="h2" fontSize={{ base: '18px', md: '22px' }} mb={4}>
          プライバシーポリシーの変更
        </Heading>
        <Text>
          当ブログは、個人情報に関して適用される日本の法令を遵守するとともに、本プライバシーポリシーの内容を適宜見直して改善に努めます。
        </Text>
      </Box>
      <Text>
        制定日:2022年5月20日
        <br />
        iwtttter-blog
      </Text>
    </>
  )
}

export default PrivacyPage

PrivacyPage.getLayout = (page) => <MainLayout>{page}</MainLayout>
