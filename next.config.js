/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['fitsourcer-files.s3.amazonaws.com']
  }
}

module.exports = nextConfig
