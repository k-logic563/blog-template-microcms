import { NextSeoProps } from 'next-seo'

import pkg from '~/package.json'

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s | ${pkg.name}`,
  defaultTitle: pkg.name,
  description: 'フロントエンドiwtがつぶやく技術系サイトです。',
  openGraph: {
    url: 'https://iwtttter.tech',
    title: pkg.name,
    description: 'フロントエンドiwtがつぶやく技術系サイトです。',
    site_name: pkg.name,
  },
  twitter: {
    handle: '@webD_hello21',
    site: 'https://iwtttter.tech',
    cardType: 'summary_large_image'
  }
}
