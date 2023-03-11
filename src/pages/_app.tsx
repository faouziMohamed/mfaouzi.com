/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
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
import '@/futura-spinner.module.scss/globals.scss';

import { createEmotionCache } from '@/lib/utils';

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
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <title>Faouzi Mohamed</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
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
    </CacheProvider>
  );
}
