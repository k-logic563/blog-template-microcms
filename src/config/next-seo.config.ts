import { NextSeoProps } from 'next-seo'

import pkg from '~/package.json'

export const seoConfig: NextSeoProps = {
  titleTemplate: `%s | ${pkg.name}`,
  defaultTitle: pkg.name,
  description: pkg.description,
}
