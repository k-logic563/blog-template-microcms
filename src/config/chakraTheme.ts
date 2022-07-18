import { extendTheme, ThemeConfig } from '@chakra-ui/react'

export const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme: ThemeConfig = extendTheme({
  ...config,
  fonts: {
    headings:
      'Helvetica Neue, Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
    body: 'Helvetica Neue, Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  },
})
