import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during next build
  },
  images: {
    domains: ['openweathermap.org'],
  },
};

export default nextConfig;
