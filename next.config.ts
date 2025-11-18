import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shadcnstudio.com'
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
    ],
  },
};

export default nextConfig;
