/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/api/event/webhook',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bijlmakers.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'wallpapercat.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;