import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

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
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
