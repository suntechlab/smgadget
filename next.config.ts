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
      {
        protocol: 'https',
        hostname: 'pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'media.tenor.com'
      },
      {
        protocol: 'https',
        hostname: 'steamcdn-a.akamaihd.net'
      },
      {
        protocol: 'https',
        hostname: 'stickershop.line-scdn.net'
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to'
      },
    ],
  },
};

export default nextConfig;
