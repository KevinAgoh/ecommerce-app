/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeimg.com', 'picsum.photos'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  distDir: '_next',
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  }
};

module.exports = nextConfig;
