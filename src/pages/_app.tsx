import React, { useEffect } from 'react'
import type { AppPropsWithLayout } from 'next/app'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'

import { GA_TRACKING_ID, pageview } from '@/lib/gtag'
import { seoConfig } from '@/config/next-seo.config'

import '@/styles/global.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter()

  useEffect(() => {
    if (!GA_TRACKING_ID) return

    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return getLayout(
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
