/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any, react/no-danger */

import createEmotionServer from '@emotion/server/create-instance';
import getConfig from 'next/config';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

import { createEmotionCache, openGraphImage } from '@/lib/utils';

import getLdJsonStringified from '@/Repository/data/seo/ldJsonDataDefinition';
import seoDefault from '@/Repository/data/seo/seoDefault';
import theme from '@/styles/themes/mui-theme';

const ogImg = openGraphImage({
  description: seoDefault.description,
  siteName: seoDefault.siteName,
  templateTitle: seoDefault.siteName,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/faouzi-mhd.jpeg`,
  theme: 'light',
});

const { publicRuntimeConfig } = getConfig();
const { lastBuild } = publicRuntimeConfig;

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='robots' content={seoDefault.robots} />
          <meta name='description' content={seoDefault.description} />
          <meta
            name='site_map'
            content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`}
          />
          <meta property='og:Name' content={seoDefault.title} />
          <meta property='og:site_name' content={seoDefault.siteName} />
          <meta property='og:description' content={seoDefault.description} />
          <meta property='og:image' content={ogImg} name='image' />
          <meta property='og:image:width' content={seoDefault.imageWidth} />
          <meta property='og:image:height' content={seoDefault.imageHeight} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@fz_faouzi' />
          <meta
            name='twitter:image:alt'
            content={"Faouzi Mohamed's Portfolio"}
          />
          <meta name='twitter:creator' content='@fz_faouzi' />

          {lastBuild ? (
            <>
              <meta
                name='publish_date'
                property='og:publish_date'
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                content={lastBuild}
              />
              <meta
                name='author'
                property='article:author'
                content='Faouzi Mohamed'
              />
            </>
          ) : null}

          <meta name='copyright' content='Faouzi Mohamed' />
          <meta name='classification' content='portfolio' />

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
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: getLdJsonStringified({
                siteUrl: seoDefault.url!,
                dateModified: lastBuild,
                ogImage: ogImg,
              }),
            }}
          />
          {/* @ts-expect-error: attribute not existing */}
          {this.props.emotionStyleTags}
        </Head>
        <body className='text-black dark:bg-dark-400 dark:text-gray-100'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...emotionStyleTags, ...Children.toArray(initialProps.styles)],
  };
};

export default MyDocument;
