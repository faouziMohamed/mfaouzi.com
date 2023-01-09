/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-assignment,react/no-danger */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/destructuring-assignment */
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraphImage } from '@/lib/helper';

import FavIcons from '@/components/FavIcons';
import getLdJsonStringified from '@/components/ldJsonDataDefinition';

import theme from '@/themes/theme';
import { useNextTheme } from '@/themes/themeContext';

const defaultMeta = {
  title: 'Faouzi Mohamed',
  siteName: "Faouzi Mohamed's Portfolio",
  description:
    'My personal Portfolio where I present myself, my skills, some projects etc. ',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  pathname: '/',
  type: 'website',
  robots: 'follow, index',
  locale: 'en_US',
  imageWidth: '1200',
  imageHeight: '630',
  ogId: process.env.NEXT_PUBLIC_FB_APP_ID,
  keywords:
    'faouzi, mohamed,Faouzi Mohamed, Portfolio, developer, web developer, full-stack developer, backend developer, resume',
};

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
  const { date = lastBuild || '', image } = props;
  const meta = { ...defaultMeta, ...props, date };
  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;
  const pathname = meta.pathname || router.pathname;
  meta.image =
    image ??
    openGraphImage({
      description: meta.description,
      siteName: props.templateTitle ? meta.siteName : meta.title,
      templateTitle: props.templateTitle,
      logo: 'https://avatars.githubusercontent.com/u/57812398?&v=4',
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
      <meta
        name='site_map'
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`}
      />
      <meta name='url' content={meta.url} />
      <meta name='copyright' content='Faouzi Mohamed' />
      <meta name='classification' content='portfolio' />
      <meta name='keywords' content={`${meta.keywords}`} />

      {/* Open Graph */}
      <meta property='og:url' content={`${meta.url}${meta.pathname}`} />
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:Name' content={meta.title} />
      <meta property='og:image' content={meta.image} name='image' />
      <meta property='og:image:width' content={meta.imageWidth} />
      <meta property='og:image:height' content={meta.imageHeight} />
      <meta name='fb:app_id' property='fb:app_id' content={meta.ogId} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@fz_faouzi' />
      <meta name='twitter:Name' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      <meta name='twitter:image:alt' content={"Faouzi Mohamed's Portfolio"} />
      <meta name='twitter:creator' content='@fz_faouzi' />

      {meta.date && (
        <>
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          <meta
            name='author'
            property='article:author'
            content='Faouzi Mohamed'
          />
        </>
      )}

      <meta
        name='apple-mobile-web-app-Name'
        content={process.env.NEXT_PUBLIC_APP_NAME}
      />
      <meta
        name='application-name'
        content={process.env.NEXT_PUBLIC_APP_NAME}
      />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-touch-fullscreen' content='yes' />

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
