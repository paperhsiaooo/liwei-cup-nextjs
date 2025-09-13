/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.jsdelivr.net'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'none'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "img-src 'self' data: blob: https://cdn.jsdelivr.net",
              "font-src 'self' data: https://fonts.gstatic.com",
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://us.i.posthog.com",
              "connect-src 'self' https://www.google-analytics.com https://us.i.posthog.com https:",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
