/* eslint-disable @typescript-eslint/no-unsafe-call */

import { createSecureHeaders } from 'next-secure-headers';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'long',
};
const lastBuild = new Date(new Date().toUTCString()).toLocaleString(
  'en-US',
  options,
);

/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    dirs: ['src'],
  },

  images: {
    domains: [
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  publicRuntimeConfig: { lastBuild },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...createSecureHeaders(),
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // SVGR
  webpack(config) {
    config.module.rules.push(
      {
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              icon: true,
            },
          },
        ],
      },
    );

    return config;
  },
};

export default config;
