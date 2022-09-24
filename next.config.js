/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  images: {
    domains: ['images.microcms-assets.io'],
  },
}
// eslint-disable-next-line no-undef
module.exports = nextConfig
