import React from 'react'
import type { AppPropsWithLayout } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { GoogleAnalytics, usePagesViews } from 'nextjs-google-analytics'

import { seoConfig } from '@/config/next-seo.config'

import '@/styles/global.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  usePagesViews()

  return getLayout(
    <>
      <GoogleAnalytics />
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
