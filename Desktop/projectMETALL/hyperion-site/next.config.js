/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    // Для Railway и других платформ
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Для работы на Railway
  output: 'standalone',
}

module.exports = nextConfig

