/* eslint-disable react/jsx-props-no-spreading,@typescript-eslint/no-unsafe-assignment,react/no-danger */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/destructuring-assignment */
import Head from 'next/head';

import theme from '@/styles/themes/mui-theme';
import { useNextTheme } from '@/styles/themes/theme-color';

export default function AppSeoTheme() {
  const { theme: themeMode } = useNextTheme();
  const themeColor =
    themeMode === 'dark'
      ? theme.palette.primary.dark
      : theme.palette.primary.main;
  return (
    <Head>
      <meta name='theme-color' content={themeColor} />
      <meta name='apple-mobile-web-app-status-bar-style' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />
    </Head>
  );
}
