/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-assignment,react/no-danger */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/destructuring-assignment */
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraphImage } from '@/lib/utils';

import FavIcons from '@/components/FavIcons';

import devData from '@/Repository/data/dev-data';
import getLdJsonStringified from '@/Repository/data/seo/ldJsonDataDefinition';
import defaultMeta from '@/Repository/data/seo/seoDefault';
import theme from '@/styles/themes/mui-theme';
import { useNextTheme } from '@/styles/themes/theme-color';

type SeoProps = {
  image?: string;
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

const { publicRuntimeConfig } = getConfig();
const { lastBuild } = publicRuntimeConfig;
export default function Seo(props: SeoProps) {
  const router = useRouter();
  const { theme: themeMode } = useNextTheme();
  const { date = lastBuild || '', image, templateTitle } = props;
  const meta = { ...defaultMeta, ...props, date };
  meta.title = templateTitle
    ? `${templateTitle} | ${meta.siteName}`
    : meta.title;
  const pathname = meta.pathname || router.pathname;
  meta.image =
    image ??
    openGraphImage({
      description: meta.description,
      siteName: props.templateTitle ? meta.siteName : meta.title,
      templateTitle: props.templateTitle,
      logo: devData.avatar,
      theme: themeMode,
    });
  const themeColor =
    themeMode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta name='description' content={meta.description} />
      <link rel='canonical' href={`${meta.url}${pathname}`} />
      <meta name='url' content={meta.url} />
      <meta name='keywords' content={`${meta.keywords}`} />

      {/* Open Graph */}
      <meta property='og:url' content={`${meta.url}${meta.pathname}`} />
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:Name' content={meta.title} />
      <meta property='og:image' content={meta.image} name='image' />

      {/* Twitter */}
      <meta name='twitter:Name' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />

      {/* Theme */}
      <meta name='theme-color' content={themeColor} />
      <meta name='apple-mobile-web-app-status-bar-style' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />

      {/*  JSON LD  */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: getLdJsonStringified({
            siteUrl: defaultMeta.url!,
            dateModified: lastBuild,
            ogImage: meta.image,
          }),
        }}
        key='structured-data'
      />
      {/* FavIcons */}
      <FavIcons />
    </Head>
  );
}
