/* eslint-disable @typescript-eslint/no-unsafe-call */

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'long'
};
const lastBuild = new Date(new Date().toUTCString())
  .toLocaleString('en-US', options,);

const { createSecureHeaders } = require('next-secure-headers');
/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src']
  },

  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  publicRuntimeConfig: { lastBuild },
  poweredByHeader: false,

  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },

  // SVGR
  webpack(config) {
    config.module.rules.push(
      {
        type: 'asset',
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              icon: true
            }
          }
        ]
      },
    );

    return config;
  }
};
