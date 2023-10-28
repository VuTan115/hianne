/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  swcMinify: true,
  poweredByHeader: false,
  optimizeFonts: true,
  images: {
    // unoptimized: process.env.NODE_ENV === 'development',
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'images.unsplash.com',
      'lh3.google.com',
      'lh3.googleusercontent.com',
      'tailwindui.com',
      'cdn.shopify.com',
      'via.placeholder.com',
      'res.cloudinary.com',
      'drive.google.com',
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

module.exports = nextConfig
