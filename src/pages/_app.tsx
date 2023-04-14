/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import '@fontsource/ubuntu/300.css';
import '@fontsource/ubuntu/400.css';
import '@fontsource/ubuntu/500.css';
import '@fontsource/ubuntu/700.css';
import '@/styles/globals.scss';

import { calculatePageTitle, createEmotionCache } from '@/lib/utils';

import devData from '@/Repository/data/dev-data';
import getPageSeo, { PageUrl } from '@/Repository/data/seo/seoTemplate';
import theme from '@/styles/themes/mui-theme';
import NextThemeProvider from '@/styles/themes/theme-color';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, router } = props;
  const pagePath = router.asPath as PageUrl;
  const seoTemplate = getPageSeo(pagePath);
  const title = calculatePageTitle(seoTemplate);
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>{title || devData.fullName}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <SessionProvider session={pageProps.session} refetchInterval={10}>
        <ThemeProvider theme={theme}>
          <NextThemeProvider>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </NextThemeProvider>
        </ThemeProvider>
      </SessionProvider>
      <Script
        src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "ef48beb9e14244c49e6dc029d90095ba"}'
      />
    </CacheProvider>
  );
}
