import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

import { config } from '@/config/chakraTheme'

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="js">
        <Head>
          <script
            async
            defer
            data-website-id="7e2007d1-5182-470a-99cb-75ce41ee0dd5"
            src="https://iwtttter-umami.vercel.app/umami.js"
          ></script>
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
