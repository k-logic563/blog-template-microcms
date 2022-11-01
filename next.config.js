/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io'],
  },
  swcMinify: true,
}
// eslint-disable-next-line no-undef
module.exports = nextConfig
