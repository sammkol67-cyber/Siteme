/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'fa',
  },
  experimental: {
    appDir: false
  }
};

module.exports = nextConfig;
