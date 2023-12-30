/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeimg.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
