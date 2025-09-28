const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['krishtiwari.xyz'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'krishtiwari.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'krishtiwari.xyz',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
