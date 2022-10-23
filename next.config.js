/* eslint-disable @typescript-eslint/no-unsafe-call */

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

const { createSecureHeaders } = require('next-secure-headers');
const isProd = process.env.NODE_ENV === 'production';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/(^\w+:|^)\/\//, '');
const env = process.env.NODE_ENV;
// console.log(router);
// decide http or https based on node environment
const protocol = env === 'development' ? 'http://' : 'https://';

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
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

  async rewrites() {
    return [
      {
        source: '/resume',
        destination: `${protocol}resume${siteUrl}`,
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
