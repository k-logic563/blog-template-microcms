import { NextSeoProps } from 'next-seo'

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s | iwtttter.tech`,
  defaultTitle: 'iwtttter.tech',
  description: 'フロントエンドiwtがつぶやく技術系サイトです。',
  openGraph: {
    url: 'https://iwtttter.tech',
    title: 'iwtttter.tech',
    description: 'フロントエンドiwtがつぶやく技術系サイトです。',
    site_name: 'iwtttter.tech',
  },
  twitter: {
    handle: '@webD_hello21',
    site: 'https://iwtttter.tech',
    cardType: 'summary_large_image',
  },
}
