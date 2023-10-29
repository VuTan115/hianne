/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  optimizeFonts: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },

      {
        protocol: 'https',
        hostname: 'lh3.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
      },
    ],

    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    // swcMinify: true,
    // optimizeCss: true,
    // gzipSize: true,
    scrollRestoration: true,
    // adjustFontFallbacks: true,
    optimizePackageImports: [
      'lodash-es',
      '@headlessui/react',
      '@heroicons/react',
      '@components/',
      '@components/*',
    ],
  },
};

module.exports = nextConfig;
