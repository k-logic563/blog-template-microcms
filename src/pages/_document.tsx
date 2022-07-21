import React from 'react'
import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '@/lib/gtag'
import { config } from '@/config/chakraTheme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="js">
        <Head>
          {GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'region': ['BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'GR', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'LT', 'LU', 'HU', 'MT', 'NL', 'AT', 'PL', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE']
                  })
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname
                  });
                `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <ColorModeScript initialColorMode={config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
