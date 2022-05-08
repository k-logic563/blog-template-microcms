import React from 'react'
import type { AppPropsWithLayout } from 'next/app'
import { DefaultSeo } from 'next-seo'

import { seoConfig } from '@/next-seo.config'

import '@/styles/global.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
