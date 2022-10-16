import type { AppPropsWithLayout } from 'next/app'
import { DefaultSeo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'

import { seoConfig } from '@/config/next-seo.config'

import '@/styles/global.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <DefaultSeo {...seoConfig} />
      <NextNProgress
        color="#14b8a6"
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
