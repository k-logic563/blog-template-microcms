import { createGetInitialProps } from '@mantine/next'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

const getInitialProps = createGetInitialProps()

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang="js">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
