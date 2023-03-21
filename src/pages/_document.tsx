/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any, react/no-danger */

import createEmotionServer from '@emotion/server/create-instance';
import getConfig from 'next/config';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

import { SITE_URL } from '@/lib/client-route.contant';
import { createEmotionCache, getOgImage } from '@/lib/utils';

import FavIcons from '@/components/FavIcons';

import getLdJsonStringified from '@/Repository/data/seo/ldJsonDataDefinition';
import getPageSeo, {
  PAGE_URLS,
  PageUrl,
  SEO_TEMPLATE_FILE_PATH,
} from '@/Repository/data/seo/seoTemplate';
import theme from '@/styles/themes/mui-theme';

const { publicRuntimeConfig } = getConfig();
const { lastBuild } = publicRuntimeConfig as { lastBuild: string };

class MyDocument extends Document {
  render() {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __NEXT_DATA__: nextData } = this.props;
    const path = nextData.page as PageUrl;
    if (!PAGE_URLS.includes(path)) {
      // throw a warning if the path does not have a corresponding SEO template
      // eslint-disable-next-line no-console
      console.warn(
        `The path name ${path} does not have a corresponding SEO template. Please consider adding one to the ${SEO_TEMPLATE_FILE_PATH} file.`,
      );
    }
    const seoTemplate = getPageSeo(path);
    const ogImg = getOgImage(seoTemplate);
    const canonical = `${SITE_URL}${path}`;
    const themeColor = theme.palette.primary.main;
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <meta name='theme-color' content={themeColor} />
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta name='robots' content={seoTemplate.robots} />
          <meta name='description' content={seoTemplate.description} />
          <meta name='site_map' content={`${SITE_URL}/sitemap.xml`} />
          <link rel='canonical' href={canonical} />
          <meta name='url' content={canonical} />
          <meta name='keywords' content={seoTemplate.keywords} key='keywords' />

          {/* Open Graph */}
          <meta property='og:url' content={canonical} />
          <meta property='og:type' content={seoTemplate.type} />
          <meta property='og:Name' content={seoTemplate.title} />
          <meta property='og:site_name' content={seoTemplate.siteName} />
          <meta property='og:description' content={seoTemplate.description} />
          <meta property='og:image' content={ogImg} name='image' />
          <meta property='og:image:width' content={seoTemplate.imageWidth} />
          <meta property='og:image:height' content={seoTemplate.imageHeight} />

          {/* Twitter */}
          <meta name='twitter:Name' content={seoTemplate.title} />
          <meta name='twitter:description' content={seoTemplate.description} />
          <meta name='twitter:image' content={ogImg} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@fz_faouzi' />
          <meta
            name='twitter:image:alt'
            content={"Faouzi Mohamed's Portfolio"}
          />
          <meta name='twitter:creator' content='@fz_faouzi' />
          <meta name='theme-color' content={themeColor} />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content={themeColor}
          />
          <meta name='msapplication-TileColor' content={themeColor} />
          {lastBuild ? (
            <>
              <meta
                name='publish_date'
                property='og:publish_date'
                content={lastBuild}
              />
              <meta
                name='author'
                property='article:author'
                content='Faouzi Mohamed'
              />
            </>
          ) : null}

          <meta name='copyright' content={seoTemplate.siteName} />
          <meta name='classification' content='portfolio' />

          <meta
            name='apple-mobile-web-app-Name'
            content={seoTemplate.siteName}
          />
          <meta name='application-name' content={seoTemplate.siteName} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-touch-fullscreen' content='yes' />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: getLdJsonStringified({
                dateModified: lastBuild,
                seo: seoTemplate,
              }),
            }}
          />
          <FavIcons />
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
