/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.candlepilot.com',
        port: '1000',
      },
    ],
  },
};

export default nextConfig;
