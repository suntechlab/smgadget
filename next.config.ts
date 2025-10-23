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
        hostname: 'i.dummyjson.com'
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.ajio.com'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'adsadplacehold.co'
      },
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com'
      },
      {
        protocol: 'https',
        hostname: 'www.google.com'
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
    ],
  },
};

export default nextConfig;
